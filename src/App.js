import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CityOption from "./components/CityOption";
import MainWeather from "./components/MainWeather";
import TodayWeather from "./components/TodayWeather";
import ThreeHoursReport from "./components/ThreeHoursReport";
import WeekReport from "./components/WeekReport";
import { fetchWeather } from "./utils/api";
import './styles.css';


const App = () => {
  const [isCityOptionShow, setCityOptionShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("臺北市");
  const [weatherData, setWeatherData] = useState(null);

  // 掛載時自動fetch臺北市天氣
  useEffect(() => {
    const fetchTaipeiWeather = async () => {
      try {
        const data = await fetchWeather("臺北市");
        setWeatherData(data);
      } catch (error) {
        console.error("初始天氣資料獲取失敗:", error);
      }
    };

    fetchTaipeiWeather();
  }, []);

  const toggleCityOption = () => {
    setCityOptionShow(!isCityOptionShow);
  };


  return (
    <>
      <Header
        onToggleCityOption={toggleCityOption}
        selectedCity={selectedCity}
      />

      <div className="main-container relative">
        <CityOption
          isShow={isCityOptionShow}
          setSelectedCity={setSelectedCity}
          setWeatherData={setWeatherData}
        />
        <MainWeather weatherData={weatherData} />
        <TodayWeather weatherData={weatherData} />
        {/* <ThreeHoursReport weatherData={weatherData} /> */}
        <WeekReport weatherData={weatherData} />
      </div>
    </>
  );
}

export default App;