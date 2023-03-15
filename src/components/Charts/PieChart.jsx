import React from 'react';
import { Pie } from 'react-chartjs-2';

const labels = ["Open", "Closed", "Hospitalized"];

const PieChart = ({ chartData }) => {

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
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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

export default PieChart