import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherIcon from './WeatherIcon';
import Loader from './Loader';

const ThreeHoursReport = ({ weatherData }) => {

    if (!weatherData || !weatherData.threeHoursForecast) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        )
    }

    const { threeHoursForecast } = weatherData;

    // 檢查 threeHoursForecast 是否為陣列且包含所需的數據
    if (!Array.isArray(threeHoursForecast) || threeHoursForecast.length < 5) {
        return <p>天氣資料格式錯誤</p>;
    }

    // 天氣陣列
    const weatherDesc = threeHoursForecast[0]; // 天氣描述
    const weatherCode = weatherDesc.map(item => item.weather.parameterValue); // 天氣代碼
    const rainfall = threeHoursForecast[1]; // 降雨機率
    const tempMin = threeHoursForecast[2]; // 最低溫
    const tempMax = threeHoursForecast[4]; // 最高溫

    // 確保這些陣列都有至少 5 筆資料
    if (![weatherDesc, rainfall, tempMin, tempMax].every(arr => Array.isArray(arr) && arr.length >= 5)) {
        return <p>天氣資料不完整</p>;
    }



    // 生成 5 個時段的天氣卡片
    const ThreeHourCards = weatherDesc.slice(0, 5).map((item, index) => ({
        id: index + 1,
        icon: WeatherIcon(Number(weatherCode[index]), 'auto'),
        alt: item.weather.parameterName,
        time: item.time || "N/A",
        pop: `${rainfall[index]?.weather?.parameterName || "N/A"}%`
    }));

    return (
        <section className="main-weather gap-5 large-desktop:gap-10">
            <WeatherCard
                title="三小時預報"
                cards={ThreeHourCards} />
        </section>
    );
}

export default ThreeHoursReport;