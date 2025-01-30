import { React, useState, useEffect } from "react";
import { fetchWeather } from "../utils/api";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('新北市');

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(city);
                console.log("Check Fetched data:", data.records.location[0]); // 檢查返回數據
                setWeatherData(data.records.location[0]);
                console.log("Check Updated weatherData:", data.records.location[0]); // 確認是否更新狀態
            } catch (error) {
                console.error(error);
            }
        };
        getWeather();
    }, [city]);
    return (
        <div>
            <h1>台灣即時天氣預報</h1>
            <WeatherCard weatherData={weatherData} />
        </div>
    );
}

export default Home;