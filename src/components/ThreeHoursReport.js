import iconSunny from '../images/icon-sunny.png';
import WeatherCard from './WeatherCard';

const ThreeHoursReport = () => {
    const ThreeHourTitle = "三小時預報";
    const ThreeHourCards = [
        { id: 1, icon: iconSunny, alt: ThreeHourTitle, pop: "10%", time: "12時" },
        { id: 2, icon: iconSunny, alt: ThreeHourTitle, pop: "10%", time: "12時" },
        { id: 3, icon: iconSunny, alt: ThreeHourTitle, pop: "10%", time: "12時" },
        { id: 4, icon: iconSunny, alt: ThreeHourTitle, pop: "10%", time: "12時" },
        { id: 5, icon: iconSunny, alt: ThreeHourTitle, pop: "10%", time: "12時" }
    ]
    return (
        <section className="main-weather gap-5 large-desktop:gap-10">
            <WeatherCard
                title="三小時預報"
                cards={ThreeHourCards} />
        </section>
    );
}

export default ThreeHoursReport;