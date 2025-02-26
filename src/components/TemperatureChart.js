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

    // X 軸標籤（日期）
    const labels = data.map((item) => {
        const dateObj = new Date(item.date);
        return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    });

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
        maintainAspectRatio: false,  //允許根據div大小變化
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: {
                    color: "rgba(255, 255, 255,0.3)", // 設定圖例顏色
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: false,
                text: "未來 7 天氣溫變化",
                color: "rgba(255, 255, 255)", // 設定標題顏色
                font: {
                    size: 18,
                    weight: "bold",
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(255, 255, 255,0.3)", // X 軸字體顏色（日期）
                    font: {
                        size: 16,
                        weight: "bold",
                    }
                }
            },
            y: {
                beginAtZero: false,
                ticks: {
                    color: "rgba(255, 255, 255,0.3)", // Y 軸字體顏色（溫度）
                    font: {
                        size: 16,
                        weight: "bold",
                    },
                }
            }
        }
    };

    // 背景色
    const chartContainerStyle = {
        backgroundColor: "rgba(75, 115, 227,0)",
        padding: "10px",
        borderRadius: "10px",
        width: "100%",  // 讓 div 填滿父層
        height: "400px"// 設定固定高度，確保 canvas 不會塌陷
    };

    return (
        <div style={chartContainerStyle}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TemperatureChart;