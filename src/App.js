import React, { useState } from "react";
import Header from "./components/Header";
import CityOption from "./components/CityOption";
import MainWeather from "./components/MainWeather";
import TodayWeather from "./components/TodayWeather";
import ThreeHoursReport from "./components/ThreeHoursReport";
import WeekReport from "./components/WeekReport";
import './styles.css';


const App = () => {
  const [isCityOptionShow, setCityOptionShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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
        <ThreeHoursReport weatherData={weatherData} />
        <WeekReport weatherData={weatherData} />
      </div>
    </>
  );
}

export default App;