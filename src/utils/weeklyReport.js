export const weeklyReport = (weeklyData) => {
    if (!weeklyData || !weeklyData.WeatherElement) {
        return [];
    }

    const maxTempData = weeklyData.WeatherElement.find(el => el.ElementName === "最高溫度");
    const minTempData = weeklyData.WeatherElement.find(el => el.ElementName === "最低溫度");
    const weatherDescData = weeklyData.WeatherElement.find(el => el.ElementName === "天氣現象");

    if (!maxTempData || !minTempData || !weatherDescData) {
        return [];
    }

    // 先建立完整的資料陣列
    const allForecasts = maxTempData.Time.map((item, index) => ({
        date: item.StartTime.split("T")[0],
        maxTemp: maxTempData.Time[index]?.ElementValue[0]?.MaxTemperature || "N/A",
        minTemp: minTempData.Time[index]?.ElementValue[0]?.MinTemperature || "N/A",
        weather: weatherDescData.Time[index]?.ElementValue[0]?.Weather || "N/A",
        weatherCode: weatherDescData.Time[index]?.ElementValue[0]?.WeatherCode || "N/A"
    }));

    // 按日期分組並合併同一天的資料
    const groupedForecasts = allForecasts.reduce((acc, forecast) => {
        if (!acc[forecast.date]) {
            // 第一次遇到這個日期
            acc[forecast.date] = forecast;
        } else {
            // 已經有這個日期的資料，比較並更新
            const existing = acc[forecast.date];
            acc[forecast.date] = {
                date: forecast.date,
                maxTemp: Math.max(Number(existing.maxTemp), Number(forecast.maxTemp)).toString(),
                minTemp: Math.min(Number(existing.minTemp), Number(forecast.minTemp)).toString(),
                weather: existing.weather,  // 保留當天第一筆的天氣描述
                weatherCode: existing.weatherCode  // 保留當天第一筆的天氣代碼
            };
        }
        return acc;
    }, {});

    // 轉換回陣列格式
    return Object.values(groupedForecasts);
};