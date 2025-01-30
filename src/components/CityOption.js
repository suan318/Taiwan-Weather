import { React, useState, useEffect } from "react";
import { fetchWeather } from "../utils/api";

const CityOption = ({ isShow, setSelectedCity }) => {
    const [showCityOptions, setShowCityOptions] = useState(isShow);  // 控制城市選項顯示狀態
    const [cities, setCities] = useState([]);  // 儲存所有城市名稱
    const [weatherData, setWeatherData] = useState(null);  // 儲存選擇城市的天氣資料

    // 從 API 中獲取所有城市資料
    useEffect(() => {
        const fetchCities = async () => {
            try {
                // 獲取所有縣市的資料
                const data = await fetchWeather();

                // 從 API 回傳的資料中提取所有 locationName
                const locations = data.records.location.map((loc) => loc.locationName);
                setCities(locations);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };

        fetchCities();
    }, []);

    // 當使用者選擇城市後觸發
    const handleCitySelect = async (cityName) => {
        setSelectedCity(cityName);  // 設定選擇的城市名稱
        setShowCityOptions(false);   // 隱藏 city options
        try {
            // 根據選擇的城市查詢天氣資料
            const data = await fetchWeather(cityName);
            setWeatherData(data);  // 設定回傳的天氣資料
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    };

    // 根據 showCityOptions 來設定 className
    useEffect(() => {
        setShowCityOptions(isShow);
    }, [isShow]);

    return (
        <div className={`city-option ${showCityOptions ? "show" : "hidden"}`}>
            <ul className="list-none col gap-5">
                {cities.length > 0 ? (
                    cities.map((cityName, index) => (
                        <li key={index} className="options" onClick={() => handleCitySelect(cityName)}>
                            <h1 className="text-xl">{cityName}</h1>
                        </li>
                    ))
                ) : (
                    <li>Loading cities...</li> // 當縣市資料尚未載入時顯示提示
                )}
            </ul>
        </div>
    );
}

export default CityOption;