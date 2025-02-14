//中央氣象局API  URL：https://opendata.cwa.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}

import cityMapping from "./cityMapping";
import { fetchCityList } from "./fetchCityList";
import { getWeatherForNow } from "./getWeatherForNow";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

//取得城市清單
export { fetchCityList };

//找出請求時符合的時間段
export { getWeatherForNow };

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
        // 過濾出 36 小時預報資料中當下時間符合的資料
        const shortTermWeather = shortTermData.weatherElement ? getWeatherForNow(shortTermData.weatherElement) : [];
        //3小時天氣預報
        const threeHoursForecast = shortTermData.weatherElement ? threeHoursReport(shortTermData.weatherElement) : [];

        console.log("shortTermData.weatherElement:", shortTermData.weatherElement)
        //console.log("36小時天氣資料:", shortTermData);
        console.log("過濾出36小時天氣資料:", shortTermWeather);
        console.log("三小時天氣預測:", threeHoursForecast);

        // 解析一週預報：遍歷 Locations 陣列來查找指定的城市
        const weeklyData = weeklyRes.records.Locations
            .flatMap(location => location.Location) // 合併所有 Location
            .find(loc => loc.LocationName === cityName) || {}; // 查找匹配的城市

        console.log("一週天氣資料:", weeklyData);

        // 解析 即時天氣資料
        // 查找 cityMapping 中對應的 StationName
        const mappedCity = cityMapping.find(city => city.cityName === cityName);
        const stationName = mappedCity ? mappedCity.StationName : cityName;

        // 確保 API 回傳包含 records.Station
        const stations = currentRes.records.Station || [];

        // 根據 StationName 找到相對應的測站資料
        const currentData = stations.find(station => station.StationName === stationName) || {};

        //過濾出即時天氣需要的氣象資料
        const currentWeather = currentData.WeatherElement ? {
            StationName: currentData.StationName,
            TownName: currentData.GeoInfo.TownName,
            AirTemperature: Math.round(currentData.WeatherElement.AirTemperature) ?? null,
            UVIndex: currentData.WeatherElement.UVIndex ?? null,
            DailyHighTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature) ?? null,
            DailyLowTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature) ?? null
        } : null;

        console.log("即時天氣資料:", currentData);
        console.log("過濾出即時天氣資料:", currentWeather);

        return { shortTermWeather, weeklyData, currentWeather, threeHoursForecast };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { shortTermData: null, weeklyData: null, currentData: null };
    }
};

//三小時預報
export const threeHoursReport = (weatherElements) => {

    // 取得目前時間，只保留時分
    const now = new Date();
    now.setMinutes(0, 0, 0);

    // 產生 3 小時區間的時間點
    const timeSlots = [];
    for (let i = 0; i < 5; i++) {
        const newTime = new Date(now);
        newTime.setHours(now.getHours() + i * 3);
        timeSlots.push(newTime);
    }

    return weatherElements.map((element) => {
        // 記錄上一個時段的天氣數據
        let lastSlot = null;

        const threeHoursForecast = timeSlots.map(timeSlot => {
            const match = element.time.find(timeData => {
                const startTime = new Date(timeData.startTime);
                const endTime = new Date(timeData.endTime);
                return timeSlot >= startTime && timeSlot < endTime;
            });

            if (match) {
                // 更新上一個已匹配的天氣數據
                lastSlot = match.parameter;
                return {
                    time: timeSlot.getHours() === 0 ? "24時" : timeSlot.toLocaleTimeString("zh-TW", {
                        hour12: false,
                        hour: "2-digit",
                    }
                    ), weather: match.parameter
                };
            } else {
                // 如果找不到對應的時間段，使用上一次的數據
                return {
                    time: timeSlot.getHours() === 0 ? "24時" : timeSlot.toLocaleTimeString("zh-TW", {
                        hour12: false,
                        hour: "2-digit",
                    }), weather: lastSlot || "無數據"
                };
            }
        });

        return threeHoursForecast;
    });
};