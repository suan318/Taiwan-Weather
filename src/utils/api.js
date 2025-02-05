//中央氣象局API  URL：https://opendata.cwa.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}

import cityMapping from "./cityMapping";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

export const fetchCityList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`);
        const data = await res.json();

        console.log("API response:", data);
        console.log("Records:", data.records); // 檢查 records 內容
        console.log("Location:", data.records?.location); // 檢查 location 是否存在

        if (!data.records || !data.records.location) {
            throw new Error("Invalid API response format: records.location is missing or not an array");
        }

        return data.records.location.map(loc => loc.locationName);
    } catch (error) {
        console.error("Error fetching city list:", error);
        return [];
    }
};

export const fetchWeather = async (cityName) => {
    try {
        // 定義 API URLs
        const urls = {
            shortTerm: `${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`,
            weeklyForecast: `${BASE_URL}/F-D0047-091?Authorization=${API_KEY}`,
            currentWeather: `${BASE_URL}/O-A0003-001?Authorization=${API_KEY}`
        };

        // 使用 Promise.all 同時請求三個 API
        const [shortTermRes, weeklyRes, currentRes] = await Promise.all([
            fetch(urls.shortTerm).then(res => res.json()),
            fetch(urls.weeklyForecast).then(res => res.json()),
            fetch(urls.currentWeather).then(res => res.json())
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


        console.log("36小時天氣資料:", shortTermData);
        console.log("一週天氣資料:", weeklyData);
        console.log("即時天氣資料:", currentData);



        return { shortTermData, weeklyData, currentData };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { shortTermData: null, weeklyData: null, currentData: null };
    }
};