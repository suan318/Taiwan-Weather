//中央氣象局API  URL：https://opendata.cwa.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}

import cityMapping from "./cityMapping";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

//cityOption取得城市清單
export const fetchCityList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        //console.log("API response:", data);
        //console.log("Records:", data.records); // 檢查 records 內容
        //console.log("Location:", data.records?.location); // 檢查 location 是否存在


        if (!data.records || !Array.isArray(data.records.location)) {
            throw new Error("API 格式錯誤: records.location 不存在或不是個陣列");
        }

        // 提取 locationName 陣列
        const cityList = data.records.location.map(loc => loc.locationName);

        //console.log("提取城市清單:", cityList);

        return cityList;
    } catch (error) {
        console.error("載入城市清單失敗:", error);
        return [];
    }
};

//找出請求時符合的時間段
const getWeatherForNow = (weatherElements) => {
    // 當前時間
    const currentTime = new Date();
    //當前的日期
    const today = new Date().toISOString().split("T")[0];
    //今日天氣 今晚的開始時間(18:00)、明早開始時間(06:00)
    const tonightTime = new Date(`${today}T18:00:00`)

    // 設定明早 06:00
    const tomorrowTime = new Date(tonightTime);
    tomorrowTime.setDate(tomorrowTime.getDate() + 1);
    tomorrowTime.setHours(6, 0, 0, 0);

    return weatherElements.map((element) => {
        let nowData = null;
        let tonightData = null;
        let tomorrowData = null;
        //上一個時間段
        let lastSlot = null;

        element.time.forEach((timeSlot) => {
            const startTime = new Date(timeSlot.startTime);
            const endTime = new Date(timeSlot.endTime);

            // 確認當前時間的天氣
            if (currentTime >= startTime && currentTime < endTime) {
                nowData = timeSlot.parameter;
            }

            // 若當前時間在第一個時間段之前，取上一個時間段
            if (!nowData && currentTime < startTime) {
                nowData = lastSlot;
            }

            // 找到今晚 18:00 ~ 06:00 的天氣
            if (startTime >= tonightTime && startTime < tomorrowTime) {
                tonightData = timeSlot.parameter;
            }

            // 找到明早 06:00 ~ 18:00 的天氣
            if (startTime >= tomorrowTime) {
                tomorrowData = timeSlot.parameter;
            }
            // 記錄上一個時間段
            lastSlot = timeSlot.parameter;
        });

        return { now: nowData, tonight: tonightData, tomorrow: tomorrowData };
    });
};


export const fetchWeather = async (cityName) => {
    try {
        // 定義 API URLs
        const urls = {
            shortTerm: `${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`,
            weekly: `${BASE_URL}/F-D0047-091?Authorization=${API_KEY}`,
            current: `${BASE_URL}/O-A0003-001?Authorization=${API_KEY}`
        };

        // 使用 Promise.all 同時請求三個 API
        const [shortTermRes, weeklyRes, currentRes] = await Promise.all([
            fetch(urls.shortTerm).then(res => res.json()),
            fetch(urls.weekly).then(res => res.json()),
            fetch(urls.current).then(res => res.json())
        ]);

        // 解析 36 小時預報
        const shortTermData = shortTermRes.records.location.find(loc => loc.locationName === cityName) || {};

        // 解析一週預報：遍歷 Locations 陣列來查找指定的城市
        const weeklyData = weeklyRes.records.Locations
            .flatMap(location => location.Location) // 合併所有 Location
            .find(loc => loc.LocationName === cityName) || {}; // 查找匹配的城市

        // 解析 即時天氣資料

        // 查找 cityMapping 中對應的 StationName
        const mappedCity = cityMapping.find(city => city.cityName === cityName);
        const stationName = mappedCity ? mappedCity.StationName : cityName;

        // 確保 API 回傳包含 records.Station
        const stations = currentRes.records.Station || [];

        // 根據 StationName 找到相對應的測站資料
        const currentData = stations.find(station => station.StationName === stationName) || {};

        // 過濾出 36 小時預報資料中當下時間符合的資料
        const shortTermWeather = shortTermData.weatherElement ? getWeatherForNow(shortTermData.weatherElement) : [];

        //過濾出即時天氣需要的氣象資料
        const currentWeather = currentData.WeatherElement ? {
            StationName: currentData.StationName,
            TownName: currentData.GeoInfo.TownName,
            AirTemperature: Math.round(currentData.WeatherElement.AirTemperature) ?? null,
            UVIndex: currentData.WeatherElement.UVIndex ?? null,
            DailyHighTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature) ?? null,
            DailyLowTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature) ?? null
        } : null;

        //console.log("shortTermData.weatherElement:", shortTermData.weatherElement)
        //console.log("36小時天氣資料:", shortTermData);
        console.log("過濾出36小時天氣資料:", shortTermWeather);
        console.log("過濾出即時天氣資料:", currentWeather);
        console.log("一週天氣資料:", weeklyData);
        console.log("即時天氣資料:", currentData);



        return { shortTermWeather, weeklyData, currentWeather };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { shortTermData: null, weeklyData: null, currentData: null };
    }
};