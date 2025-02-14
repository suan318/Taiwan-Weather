const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

//cityOption取得城市清單
export const fetchCityList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/F-C0032-001?Authorization=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        //console.log("API response:", data);
        //console.log("Records:", data.records); // 檢查 records 內容
        //console.log("Location:", data.records?.location); // 檢查 location 是否存在


        if (!data.records || !Array.isArray(data.records.location)) {
            throw new Error("API 格式錯誤: records.location 不存在或不是個陣列");
        }

        // 提取 locationName 陣列
        const cityList = data.records.location.map(loc => loc.locationName);

        //console.log("提取城市清單:", cityList);

        return cityList;
    } catch (error) {
        console.error("載入城市清單失敗:", error);
        return [];
    }
};
