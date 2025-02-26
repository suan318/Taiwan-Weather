//環境部API  URL：https://data.moenv.gov.tw/api/v2/{DataID}?format={format}&year_month={yyyy_mm}&offset={offset}&limit={limit}&api_key={api-key}
import cityMapping from "./cityMapping";

const API_KEY = process.env.REACT_APP_ENVIRONMENT_API_KEY;
const BASE_URL = 'https://data.moenv.gov.tw/api/v2';

// 定義 API URLs
const urls = {
    envData: `${BASE_URL}/aqx_p_432?language=zh&api_key=${API_KEY}`
};

export const fetchEnvData = async (cityName) => {
    try {
        const response = await fetch(urls.envData);
        const data = await response.json();

        // 確保 records 存在，並提取需要的欄位
        const filteredenvData = data.records?.map(record => ({
            sitename: record.sitename,
            county: record.county,
            aqi: record.aqi,
            status: record.status,
            pm25: record["pm2.5"] // 注意：鍵名 "pm2.5" 需要用字串索引
        })) || [];

        // 從 cityMapping 找到對應的 sitename
        const cityData = cityMapping.find(city => city.cityName === cityName);
        if (!cityData) {
            console.warn(`找不到對應的 cityMapping 資料: ${cityName}`);
            return null;
        }

        // 用 sitename 篩選資料
        const selectedSiteData = filteredenvData.find(item => item.sitename === cityData.sitename);

        if (!selectedSiteData) {
            console.warn(`找不到匹配的 sitename: ${cityData.sitename}`);
            return null;
        }

        console.log(selectedSiteData);

        return selectedSiteData || null;

    } catch (error) {
        console.error("Error fetching env data:", error);
        return null;
    }
};