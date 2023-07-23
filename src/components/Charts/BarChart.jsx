import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ dataset }) => {
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Hospitalized",
                backgroundColor: "rgb(0, 102, 204)",
                borderColor: "rgb(0, 102, 204)",
                data: dataset.hospitalized,
            },
            {
                label: "Regular",
                backgroundColor: "rgb(0, 204, 102)",
                borderColor: "rgb(0, 204, 102)",
                data: dataset.regular,
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