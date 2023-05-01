import React from 'react';
import { Pie } from 'react-chartjs-2';

const labels = ["North", "South", "East", "West", "Kigali City"];

const PieChartAdmin = ({ chartData }) => {

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Open',
        value: 12,
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 202, 255, 0.5)',
          'rgba(100, 200, 100, 0.5)',
          'rgba(100, 100, 200, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 202, 255, 0.5)',
          'rgba(100, 200, 100, 0.5)',
          'rgba(100, 100, 200, 0.5)',
        ],
        borderWidth: 1,
      }
    ],
  };


  return (
        <div style={{ width: '100%'}}>
            <Pie data={data} />
        </div>
    )
}

export default PieChartAdmin