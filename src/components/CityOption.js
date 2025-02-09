import { React, useState, useEffect } from "react";
import { fetchCityList, fetchWeather } from "../utils/api";

const CityOption = ({ isShow, setSelectedCity, setWeatherData }) => {
    const [showCityOptions, setShowCityOptions] = useState(isShow);  // 控制城市選項顯示狀態
    const [cities, setCities] = useState([]);  // 儲存所有城市名稱

    // 從 API 中獲取所有城市資料
    useEffect(() => {
        const fetchCities = async () => {
            try {
                // 獲取所有縣市的資料
                const locations = await fetchCityList();
                setCities(locations);
            } catch (error) {
                console.error("城市清單獲取失敗:", error);
            }
        };

        fetchCities();
    }, []);

    // 當使用者選擇城市後觸發
    const handleCitySelect = async (cityName) => {
        setSelectedCity(cityName);
        setShowCityOptions(false);
        try {
            // 根據選擇的城市查詢天氣資料
            const data = await fetchWeather(cityName);
            setWeatherData(data);  // 設定回傳的天氣資料
        } catch (error) {
            console.error("天氣資料獲取失敗:", error);
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
                    <li><p>城市資料載入中......</p></li> // 當縣市資料尚未載入時顯示提示
                )}
            </ul>
        </div>
    );
}

export default CityOption;