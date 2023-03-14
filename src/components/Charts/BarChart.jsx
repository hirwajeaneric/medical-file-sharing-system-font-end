import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Hospitalized",
                backgroundColor: "rgb(0, 102, 204)",
                borderColor: "rgb(0, 102, 204)",
                data: [0, 10, 5, 2, 20, 30, 45, 2, 40, 30, 20, 13]
            },
            {
                label: "Regular",
                backgroundColor: "rgb(0, 204, 102)",
                borderColor: "rgb(0, 204, 102)",
                data: [10, 8, 7, 2, 20, 20, 45, 20, 20, 10, 5, 5 ]
            },
        ],
    };

    return (
        <div>
        <Bar data={data} />
        </div>
    );
};

export default BarChart;