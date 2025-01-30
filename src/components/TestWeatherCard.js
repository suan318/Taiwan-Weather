// import React from "react";

// const WeatherCard = ({ weatherData }) => {
//     console.log("Check Rendering WeatherCard with weatherData:", weatherData); // 檢查數據是否正確
//     if (!weatherData) {
//         return <p>Loading...</p>
//     }
//     const { locationName, weatherElement } = weatherData;
//     console.log("Check Weather Elements:", weatherElement); // 檢查 weatherElement 是否存在

//     // 使用 find 動態尋找所需的 weatherElement
//     const weatherDescription = weatherElement.find(el => el.elementName === "Wx")?.time[0]?.parameter?.parameterName || "N/A";
//     const minTemperature = weatherElement.find(el => el.elementName === "MinT")?.time[0]?.parameter?.parameterName || "N/A";
//     const maxTemperature = weatherElement.find(el => el.elementName === "MaxT")?.time[0]?.parameter?.parameterName || "N/A";

//     return (
//         <div>
//             <h2>{locationName}</h2>
//             <p>溫度: {minTemperature}°C~{maxTemperature}°C</p>
//             <p>天氣描述: {weatherDescription}</p>
//         </div>
//     );
// }
// export default WeatherCard;