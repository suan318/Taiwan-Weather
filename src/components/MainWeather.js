import MainBlock from './MainBlock';
import WeatherIcon from './WeatherIcon';

const MainWeather = ({ weatherData, envData }) => {

    if (!weatherData || !envData) {
        return <p>載入天氣資料中......</p>;
    }

    // 解析短期天氣資料
    const { currentWeather, shortTermWeather } = weatherData;

    //溫度
    const currentT = currentWeather.AirTemperature;
    const maxT = currentWeather.DailyHighTemperature;
    const minT = currentWeather.DailyLowTemperature;
    const alt = shortTermWeather[0].now.parameterName || "未知天氣";
    const weatherCode = shortTermWeather[0].now.parameterValue;

    //空氣資料
    const AqiValue = envData.aqi;
    const pm25 = envData.pm25;


    const weatherCards = [
        { id: 1, title: "目前天氣", image: WeatherIcon(Number(weatherCode)), alt: alt, showStatusBar: false },
        { id: 2, title: "溫度", value: currentT, min: minT, max: maxT, showStatusBar: true, type: 'temperature' },
    ];

    const airCards = [
        { id: 1, title: "AQI", value: AqiValue, showStatusBar: true, type: 'aqi' },
        { id: 2, title: "PM2.5", value: pm25, showStatusBar: true, type: 'pm25' },
    ];
    return (
        <main className="w-full">
            <section className="flex justify-center gap-2 tablet:gap-6 laptop:gap-8">
                {/*天氣*/}
                <MainBlock title="天氣" cards={weatherCards} />

                {/*空氣*/}
                <MainBlock title="空氣" cards={airCards} />
            </section>
        </main>
    );
}

export default MainWeather;