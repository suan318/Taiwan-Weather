export const getWeatherForNow = (weatherElements) => {
    // 當前時間
    const currentTime = new Date();
    //當前的日期
    const today = new Date().toISOString().split("T")[0];
    //今日天氣 今晚的開始時間(18:00)、明早開始時間(06:00)
    const tonightTime = new Date(`${today}T18:00:00`)

    // 設定明早 06:00
    const tomorrowTime = new Date(tonightTime);
    tomorrowTime.setDate(tomorrowTime.getDate() + 1);
    tomorrowTime.setHours(6, 0, 0, 0);

    return weatherElements.map((element) => {
        let nowData = null;
        let tonightData = null;
        let tomorrowData = null;
        //上一個時間段
        let lastSlot = null;

        element.time.forEach((timeSlot) => {
            const startTime = new Date(timeSlot.startTime);
            const endTime = new Date(timeSlot.endTime);

            // 記錄上一個時間段（但不在當前時間之前就不記錄）
            if (startTime <= currentTime) {
                lastSlot = timeSlot.parameter;
            }

            // 確認當前時間的天氣
            if (currentTime >= startTime && currentTime < endTime) {
                nowData = timeSlot.parameter;
            }

            // 若當前時間在第一個時間段之前，取上一個時間段
            if (!nowData && currentTime < startTime) {
                nowData = lastSlot;
            }

            // 找到今晚 18:00 ~ 06:00 的天氣
            if (startTime >= tonightTime && startTime < tomorrowTime) {
                tonightData = timeSlot.parameter;
            }

            // 找到明早 06:00 ~ 18:00 的天氣
            if (startTime >= tomorrowTime) {
                tomorrowData = timeSlot.parameter;
            }
            // 記錄上一個時間段
            lastSlot = timeSlot.parameter;
        });

        return { now: nowData, tonight: tonightData, tomorrow: tomorrowData };
    });
};