//中央氣象局API  URL：https://opendata.cwa.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}

import cityMapping from "./cityMapping";
import { fetchCityList } from "./fetchCityList";
import { getWeatherForNow } from "./getWeatherForNow";
import { threeHoursReport } from "./threeHoursReport";
import { weeklyReport } from "./weeklyReport";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

//取得城市清單
export { fetchCityList };

//找出請求時符合的時間段
export { getWeatherForNow };

//三小時預報
export { threeHoursReport };

//一週預報
export { weeklyReport };

// 定義 API URLs
const urls = {
    shortTerm: `${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`,
    weekly: `${BASE_URL}/F-D0047-091?Authorization=${API_KEY}`,
    current: `${BASE_URL}/O-A0003-001?Authorization=${API_KEY}`
};

// 1. 取得 API 資料
const fetchWeatherData = async () => {
    try {
        // 使用 Promise.all 同時請求三個 API
        const [shortTermRes, weeklyRes, currentRes] = await Promise.all([
            fetch(urls.shortTerm).then(res => res.json()),
            fetch(urls.weekly).then(res => res.json()),
            fetch(urls.current).then(res => res.json())
        ]);

        return { shortTermRes, weeklyRes, currentRes };

    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// 2. 解析短期天氣
const parseShortTermWeather = (shortTermRes, cityName) => {
    const shortTermData = shortTermRes.records.location.find(loc => loc.locationName === cityName) || {};

    return shortTermData.weatherElement ? getWeatherForNow(shortTermData.weatherElement) : [];
}

// 3. 解析三小時預報
const parseThreeHoursForecast = (shortTermRes, cityName) => {
    const shortTermData = shortTermRes.records.location.find(loc => loc.locationName === cityName) || {};

    return shortTermData.weatherElement ? threeHoursReport(shortTermData.weatherElement) : [];
};

// 4. 解析一週預報
const parseWeeklyWeather = (weeklyRes, cityName) => {
    const weeklyData = weeklyRes.records.Locations
        .flatMap(location => location.Location)
        .find(loc => loc.LocationName === cityName) || {};
    return weeklyData ? weeklyReport(weeklyData) : [];
};

// 5. 解析即時天氣
const parseCurrentWeather = (currentRes, cityName) => {
    const mappedCity = cityMapping.find(city => city.cityName === cityName);
    const stationName = mappedCity ? mappedCity.StationName : cityName;
    const stations = currentRes.records.Station || [];
    const currentData = stations.find(station => station.StationName === stationName) || {};

    return currentData.WeatherElement ? {
        StationName: currentData.StationName,
        TownName: currentData.GeoInfo.TownName,
        weather: currentData.WeatherElement.Weather,
        AirTemperature: Math.round(currentData.WeatherElement.AirTemperature) ?? null,
        UVIndex: currentData.WeatherElement.UVIndex ?? null,
        DailyHighTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature) ?? null,
        DailyLowTemperature: Math.round(currentData.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature) ?? null
    } : null;
};

// 6.fetchWeather
export const fetchWeather = async (cityName) => {
    const weatherData = await fetchWeatherData();
    if (!weatherData) return { shortTermWeather: null, threeHoursForecast: null, weeklyForecast: null, currentWeather: null };

    // 解析各類天氣數據
    const shortTermWeather = parseShortTermWeather(weatherData.shortTermRes, cityName);
    const threeHoursForecast = parseThreeHoursForecast(weatherData.shortTermRes, cityName);
    const weeklyForecast = parseWeeklyWeather(weatherData.weeklyRes, cityName);
    const currentWeather = parseCurrentWeather(weatherData.currentRes, cityName);

    console.log("36小時天氣資料:", shortTermWeather);
    console.log("三小時天氣預測:", threeHoursForecast);
    console.log("即時天氣資料:", currentWeather);
    console.log("一周天氣:", weeklyForecast);

    return { shortTermWeather, threeHoursForecast, weeklyForecast, currentWeather };
};


