//中央氣象局API  URL：https://opendata.cwa.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

export const fetchWeather = async (city = "") => {
    const DATA_ID = 'F-C0032-001';//一般天氣預報今明36小時
    const FORMAT = 'json';

    // 如果不傳城市名稱，則獲取所有縣市的資料
    const url = city
        ? `${BASE_URL}/${DATA_ID}?Authorization=${API_KEY}&format=${FORMAT}&locationName=${city.trim()}`
        : `${BASE_URL}/${DATA_ID}?Authorization=${API_KEY}&format=${FORMAT}`;

    const response = await fetch(url);
    console.log("API response data:", response); // 確認數據結構

    if (!response.ok) {
        throw new Error('天氣資料獲取失敗')
    }

    // 解析 JSON 數據後console
    const data = await response.json();
    console.log("Parsed API response data:", data);

    // 確認 records 和 location 結構
    console.log("Records location data:", data.records.location);

    return data;
}