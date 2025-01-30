import iconSunny from '../images/icon-sunny.png';
import WeatherCard from './WeatherCard';

const WeekReport = () => {
    const weekCards = [
        { id: 1, icon: iconSunny, alt: "一周預報", day: "今" },
        { id: 2, icon: iconSunny, alt: "一周預報", day: "明" },
        { id: 3, icon: iconSunny, alt: "一周預報", day: "三" },
        { id: 4, icon: iconSunny, alt: "一周預報", day: "四" },
        { id: 5, icon: iconSunny, alt: "一周預報", day: "五" },
        { id: 6, icon: iconSunny, alt: "一周預報", day: "六" },
        { id: 7, icon: iconSunny, alt: "一周預報", day: "日" }
    ];

    return (
        <section className="main-weather gap-5 large-desktop:gap-10">
            <WeatherCard
                title="一周預報"
                cards={weekCards}
                iconClass="icon-small"
                renderCard={(card) => <p className="text-sm">{card.day}</p>}
            />
        </section>
    );
}

export default WeekReport;