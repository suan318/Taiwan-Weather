import iconSunny from '../images/icon-sunny.png';
import TodayBlock1 from './TodayBlock1';
import TodayBlock2 from './TodayBlock2';

const TodayWeather = ({ weatherData }) => {
    if (!weatherData) {
        return <p>載入天氣資料中......</p>;
    };

    // 解析短期天氣資料
    const { shortTermWeather } = weatherData;

    // 今日天氣
    const todayWeatherDescription = shortTermWeather[0]?.now.parameterName || "未知天氣";
    const todayPop = shortTermWeather[1]?.now.parameterName || "N/A";
    const todayMinT = shortTermWeather[2]?.now.parameterName || "N/A";
    const todayMaxT = shortTermWeather[4]?.now.parameterName || "N/A";

    //天氣圖示
    const weatherIcon = shortTermWeather[0]?.parameterValue || "未知天氣";

    //今晚
    const tonightWeatherDescription = shortTermWeather[0]?.tonight.parameterName || "未知天氣";
    const tonightPop = shortTermWeather[1]?.tonight.parameterName || "N/A";
    const tonightMinT = shortTermWeather[2]?.tonight.parameterName || "N/A";
    const tonightMaxT = shortTermWeather[4]?.tonight.parameterName || "N/A";

    //明早
    const tomorrowWeatherDescription = shortTermWeather[0]?.tomorrow.parameterName || "未知天氣";
    const tomorrowPop = shortTermWeather[1]?.tomorrow.parameterName || "N/A";
    const tomorrowMinT = shortTermWeather[2]?.tomorrow.parameterName || "N/A";
    const tomorrowMaxT = shortTermWeather[4]?.tomorrow.parameterName || "N/A";


    return (
        <section className="main-weather gap-5 large-desktop:gap-10 flex-wrap">
            <h1 className="text-lg">今日天氣</h1>
            <div className="flex flex-wrap gap-13">
                {/* 今日天氣 */}
                <TodayBlock1
                    iconSunny={iconSunny}
                    tempRange={`${todayMinT}°C ~ ${todayMaxT}°C`}
                    description={`降雨機率 ${todayPop} %  ${todayWeatherDescription}`}
                />
                {/* 今日天氣 */}

                {/* 今晚及明早 */}
                <div className="w-full flex justify-center gap-12 tablet:gap-14 laptop:gap-60 large-desktop:gap-36">
                    <TodayBlock2
                        title="今晚"
                        iconSunny={iconSunny}
                        tempRange={`${tonightMinT}°C ~ ${tonightMaxT}°C`}
                        description={`降雨機率 ${tonightPop} %  ${tonightWeatherDescription}`}
                    />
                    <TodayBlock2
                        title="明早"
                        iconSunny={iconSunny}
                        tempRange={`${tomorrowMinT}°C ~ ${tomorrowMaxT}°C`}
                        description={`降雨機率 ${tomorrowPop} %  ${tomorrowWeatherDescription}`}
                    />
                </div>
                {/* 今晚及明早 */}
            </div>
        </section>
    );
};

export default TodayWeather;
