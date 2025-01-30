import iconSunny from '../images/icon-sunny.png';
import TodayBlock1 from './TodayBlock1';
import TodayBlock2 from './TodayBlock2';

const TodayWeather = () => {
    return (
        <section className="main-weather gap-5 large-desktop:gap-10 flex-wrap">
            <h1 className="text-lg">今日天氣</h1>
            <div className="flex flex-wrap gap-13">
                {/* 今日天氣 */}
                <TodayBlock1
                    iconSunny={iconSunny}
                    tempRange="20°C~25°C"
                    description="10%午後雷陣雨"
                />
                {/* 今日天氣 */}

                {/* 今晚及明早 */}
                <div className="w-full flex justify-center gap-12 tablet:gap-14 laptop:gap-60 large-desktop:gap-36">
                    <TodayBlock2
                        title="今晚"
                        iconSunny={iconSunny}
                        tempRange="18°C~20°C"
                        description="30%降雨機率"
                    />
                    <TodayBlock2
                        title="明早"
                        iconSunny={iconSunny}
                        tempRange="18°C~24°C"
                        description="70%降雨機率"
                    />
                </div>
                {/* 今晚及明早 */}
            </div>
        </section>
    );
};

export default TodayWeather;
