import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CityOption from "./components/CityOption";
import MainWeather from "./components/MainWeather";
import TodayWeather from "./components/TodayWeather";
import ThreeHoursReport from "./components/ThreeHoursReport";
import WeekReport from "./components/WeekReport";
import { fetchWeather } from "./utils/cwbApi";
import { fetchEnvData } from "./utils/epaApi";
import './styles.css';


const App = () => {
  const [isCityOptionShow, setCityOptionShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("臺北市");
  const [weatherData, setWeatherData] = useState(null);
  const [envData, setEnvData] = useState(null);

  // 掛載時自動fetch臺北市天氣&環境資料
  useEffect(() => {
    const fetchTaipeiWeather = async () => {
      try {
        const data = await fetchWeather("臺北市");
        setWeatherData(data);

        const air = await fetchEnvData("臺北市");
        setEnvData(air);

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
          setEnvData={setEnvData}
        />
        <MainWeather weatherData={weatherData} envData={envData} />
        <TodayWeather weatherData={weatherData} envData={envData} />
        <ThreeHoursReport weatherData={weatherData} envData={envData} />
        <WeekReport weatherData={weatherData} envData={envData} />
      </div>
    </>
  );
}

export default App;