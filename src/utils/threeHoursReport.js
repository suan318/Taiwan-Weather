export const threeHoursReport = (weatherElements) => {

    // 取得目前時間，只保留時分
    const now = new Date();
    now.setMinutes(0, 0, 0);

    // 產生 3 小時區間的時間點
    const timeSlots = [];
    for (let i = 0; i < 5; i++) {
        const newTime = new Date(now);
        newTime.setHours(now.getHours() + i * 3);
        timeSlots.push(newTime);
    }

    // 檢查第一個時段是否有匹配到資料
    const firstSlot = timeSlots[0];
    const isFirstMatch = weatherElements.some(element =>
        element.time.some(timeData => {
            const startTime = new Date(timeData.startTime);
            const endTime = new Date(timeData.endTime);
            return firstSlot >= startTime && firstSlot < endTime;
        })
    );

    // 如果第一個時段沒有匹配到，則把 now 加 1 小時，重新計算 timeSlots
    if (!isFirstMatch) {
        now.setHours(now.getHours() + 1);
        timeSlots.length = 0;
        for (let i = 0; i < 5; i++) {
            const newTime = new Date(now);
            newTime.setHours(now.getHours() + i * 3);
            timeSlots.push(newTime);
        }
    }

    return weatherElements.map((element) => {
        // 記錄上一個時段的天氣數據
        let lastSlot = null;

        const threeHoursForecast = timeSlots.map(timeSlot => {
            const match = element.time.find(timeData => {
                const startTime = new Date(timeData.startTime);
                const endTime = new Date(timeData.endTime);
                return timeSlot >= startTime && timeSlot < endTime;
            });

            if (match) {
                // 更新上一個已匹配的天氣數據
                lastSlot = match.parameter;
                return {
                    time: timeSlot.getHours() === 0 ? "24時" : timeSlot.toLocaleTimeString("zh-TW", {
                        hour12: false,
                        hour: "2-digit",
                    }
                    ), weather: match.parameter
                };
            } else {
                // 如果找不到對應的時間段，使用上一次的數據
                return {
                    time: timeSlot.getHours() === 0 ? "24時" : timeSlot.toLocaleTimeString("zh-TW", {
                        hour12: false,
                        hour: "2-digit",
                    }), weather: lastSlot || "無數據"
                };
            }
        });

        return threeHoursForecast;
    });
};