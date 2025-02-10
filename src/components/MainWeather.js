import iconSunny from '../images/icon-sunny.png';
import MainBlock from './MainBlock';

const MainWeather = ({ weatherData }) => {
    if (!weatherData) {
        return <p>載入天氣資料中......</p>;
    }

    // 解析短期天氣資料
    const { currentWeather } = weatherData;

    //溫度
    const currentT = currentWeather.AirTemperature;
    const maxT = currentWeather.DailyHighTemperature;
    const minT = currentWeather.DailyLowTemperature;





    const weatherCards = [
        { id: 1, title: "目前天氣", image: iconSunny, alt: "天氣", showStatusBar: false },
        { id: 2, title: "溫度", value: currentT, min: minT, max: maxT, showStatusBar: true },
    ];

    const airCards = [
        { id: 1, title: "AQI", value: "39", showStatusBar: true },
        { id: 2, title: "PM2.5", value: "8", showStatusBar: true },
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