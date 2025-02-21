import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// 註冊 Chart.js 所需的元件
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TemperatureChart = ({ data }) => {

    // 解析後端數據
    const labels = data.map((item) => item.date); // X 軸標籤（日期）
    const maxTemps = data.map((item) => Number(item.maxTemp)); // 最大溫度
    const minTemps = data.map((item) => Number(item.minTemp)); // 最小溫度

    const chartData = {
        labels,
        datasets: [
            {
                label: "最高溫度 (°C)",
                data: maxTemps,
                borderColor: "red",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.3, // 曲線平滑度
            },
            {
                label: "最低溫度 (°C)",
                data: minTemps,
                borderColor: "blue",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "未來 7 天氣溫變化" },
        },
        scales: {
            y: { beginAtZero: false },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default TemperatureChart;