import DayClear from '../images/day-sunny.png';
import NightClear from '../images/night-moon.png';
import DayPartlyCloudy from '../images/day-cloudySun.png';
import NightPartlyCloudy from '../images/night-cloudy.png';
import DayThunderstorm from '../images/day-thunderstorm.png';
import NightThunderstorm from '../images/night-thunderstorm.png';
import DayCloudy from '../images/cloudy.png';
import NightCloudy from '../images/cloudy.png';
import DayRainy from '../images/day-rainy.png';
import NightRainy from '../images/night-rainy.png';
import DayCloudyFog from '../images/day-cloudy-fog.png';
import NightCloudyFog from '../images/night-cloudy-fog.png';
import DayFog from '../images/day-fog.png';
import NightFog from '../images/night-fog.png';
import DaySnowy from '../images/snowy.png';
import NightSnowy from '../images/snowy.png';

//建立天氣代碼與天氣圖片的對應
const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],//雷陣雨
    isClear: [1],//晴天
    isCloudy: [4, 5, 6, 7],//多雲.陰天
    isRainy: [
        8, 9, 10, 11, 12,
        13, 14, 19, 20, 29, 30,
        31, 32, 38, 39,
    ],
    isPartlyCloudy: [2, 3],//晴時多雲
    isCloudyFog: [25, 26, 27, 28],//多雲有霧
    isFog: [24],//有霧
    isSnowy: [23, 37, 42],
};

//白天與晚上的天氣圖示
const weatherIcons = {
    day: {
        isThunderstorm: DayThunderstorm,
        isClear: DayClear,
        isCloudyFog: DayCloudyFog,
        isCloudy: DayCloudy,
        isRainy: DayRainy,
        isFog: DayFog,
        isPartlyCloudy: DayPartlyCloudy,
        isSnowy: DaySnowy,
    },
    night: {
        isThunderstorm: NightThunderstorm,
        isClear: NightClear,
        isCloudyFog: NightCloudyFog,
        isCloudy: NightCloudy,
        isRainy: NightRainy,
        isFog: NightFog,
        isPartlyCloudy: NightPartlyCloudy,
        isSnowNightSnowy: NightSnowy,
    }
};

// 判斷是否白天（05:00 - 18:00）
const isDaytime = () => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 18;
};

//回傳圖片 URL  period為auto:以當前時間區分日夜,day:白天,night:夜晚
const WeatherIcon = (weatherCode, period = 'auto') => {

    // 決定使用白天或晚上的圖示
    const timeOfDay = period === 'auto'
        ? (isDaytime() ? 'day' : 'night') : period;

    for (const [type, codes] of Object.entries(weatherTypes)) {
        if (codes.includes(weatherCode)) {
            return weatherIcons[timeOfDay][type] || weatherIcons.day.isClear;
        }
    }

    return weatherIcons.day.isClear; // 預設回傳晴天圖示
};

export default WeatherIcon;