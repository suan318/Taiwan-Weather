export const StatusBar = ({ value, min, max, type }) => {
    let fillWidth = 100;
    let color = '';

    if (type === 'temperature' && min !== undefined && max !== undefined) {
        // 計算溫度百分比
        fillWidth = ((value - min) / (max - min)) * 100;
        fillWidth = Math.max(0, Math.min(fillWidth, 100));
    } else if (type === 'aqi') {
        // 設置顏色
        if (value <= 50) color = 'green-400';
        else if (value <= 100) color = 'yellow-400';
        else if (value <= 150) color = 'orange-400';
        else if (value <= 200) color = 'red-400';
        else if (value <= 300) color = 'purple-400';
        else color = 'brown';
    } else if (type === 'pm25') {
        // 設置顏色
        if (value <= 15) color = 'green-400';
        else if (value <= 35) color = 'yellow-400';
        else if (value <= 54) color = 'orange-400';
        else if (value <= 150) color = 'red-400';
        else if (value <= 250) color = 'purple-400';
        else color = 'brown';
    }

    return (
        <div className="status-bar">
            <div
                className="status-bar-fill"
                style={{
                    width: `${fillWidth}%`,
                    backgroundColor: color
                }}
            ></div>
        </div>
    );
}

