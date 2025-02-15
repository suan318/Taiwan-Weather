import iconSunny from '../images/icon-sunny.png';
import WeatherCard from './WeatherCard';

const WeekReport = ({ weatherData }) => {

    if (!weatherData || !weatherData.weeklyForecast) {
        return <p>載入天氣資料中......</p>;
    }

    const { weeklyForecast } = weatherData

    //將日期轉換成今明與星期
    const convertDateToText = (dateString) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const targetDate = new Date(dateString);
        targetDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));

        switch (diffDays) {
            case 0:
                return "今";
            case 1:
                return "明";
            default:
                // 取得星期幾
                const weekDay = targetDate.getDay();
                const weekDayText = ["日", "一", "二", "三", "四", "五", "六"][weekDay];
                return weekDayText;
        }
    };

    //在每個資料中插入星期幾
    const weekCards = weeklyForecast.map(forecast => ({
        id: forecast.date,
        icon: iconSunny, // 暫時
        alt: forecast.weather,
        displayDate: convertDateToText(forecast.date),
        maxTemp: forecast.maxTemp,
        minTemp: forecast.minTemp,
    })) || [];

    return (
        <section className="main-weather gap-5 large-desktop:gap-10">
            <WeatherCard
                title="一周預報"
                cards={weekCards}
                iconClass="icon-small"
                renderCard={(card) => <p className="text-sm">{card.displayDate}</p>}
            />
        </section>
    );
}

export default WeekReport;