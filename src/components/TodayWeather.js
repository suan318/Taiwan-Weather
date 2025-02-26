import TodayBlock1 from './TodayBlock1';
import TodayBlock2 from './TodayBlock2';
import WeatherIcon from './WeatherIcon';
import Loader from './Loader';

const TodayWeather = ({ weatherData }) => {
    if (!weatherData) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        )
    };

    // 解析短期天氣資料
    const { shortTermWeather, currentWeather } = weatherData;

    //天氣敘述
    const getWeatherDescription = (time) => shortTermWeather[0][time].parameterName || "未知天氣";
    const todayWeatherDescription = getWeatherDescription("now");
    const tonightWeatherDescription = getWeatherDescription("tonight");
    const tomorrowWeatherDescription = getWeatherDescription("tomorrow");

    //天氣代碼
    const getWeatherCode = (time) => shortTermWeather[0][time].parameterValue || "未知天氣";
    const nowWeatherCode = getWeatherCode("now");
    const tonightWeatherCode = getWeatherCode("tonight")
    const tomorrowWeatherCode = getWeatherCode("tomorrow")

    //降雨機率
    const getPop = (time) => shortTermWeather[1][time].parameterName || "N/A";
    const todayPop = getPop("now");
    const tonightPop = getPop("tonight");
    const tomorrowPop = getPop("tomorrow");

    //今日氣溫
    const todayMinT = currentWeather.DailyLowTemperature || "N/A";
    const todayMaxT = currentWeather.DailyHighTemperature || "N/A";

    //今晚明早最高溫與最低溫
    const getMinT = (time) => shortTermWeather[2][time].parameterName || "N/A";
    const getMaxT = (time) => shortTermWeather[4][time].parameterName || "N/A";
    const tonightMinT = getMinT("tonight");
    const tonightMaxT = getMaxT("tonight");
    const tomorrowMinT = getMinT("tomorrow");
    const tomorrowMaxT = getMaxT("tomorrow");

    return (
        <section className="main-weather gap-5 large-desktop:gap-10 flex-wrap">
            <h1 className="text-lg">今日天氣</h1>
            <div className="flex flex-wrap gap-13">
                {/* 今日天氣 */}
                <TodayBlock1
                    icon={WeatherIcon(Number(nowWeatherCode), 'auto')}
                    tempRange={`${todayMinT}°C ~ ${todayMaxT}°C`}
                    description={`降雨機率 ${todayPop} %  ${todayWeatherDescription}`}
                    alt={todayWeatherDescription}
                />
                {/* 今日天氣 */}

                {/* 今晚及明早 */}
                <div className="w-full flex justify-center gap-12 tablet:gap-14 laptop:gap-60 large-desktop:gap-36">
                    <TodayBlock2
                        title="今晚"
                        icon={WeatherIcon(Number(tonightWeatherCode), 'night')}
                        tempRange={`${tonightMinT}°C ~ ${tonightMaxT}°C`}
                        description={`降雨機率 ${tonightPop} %  ${tonightWeatherDescription}`}
                        alt={tonightWeatherDescription}
                    />
                    <TodayBlock2
                        title="明早"
                        icon={WeatherIcon(Number(tomorrowWeatherCode), 'day')}
                        tempRange={`${tomorrowMinT}°C ~ ${tomorrowMaxT}°C`}
                        description={`降雨機率 ${tomorrowPop} %  ${tomorrowWeatherDescription}`}
                        alt={tomorrowWeatherDescription}
                    />
                </div>
                {/* 今晚及明早 */}
            </div>
        </section>
    );
};

export default TodayWeather;
