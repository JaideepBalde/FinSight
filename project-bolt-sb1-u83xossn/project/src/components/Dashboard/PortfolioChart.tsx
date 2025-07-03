import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PortfolioChart: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [100000, 105000, 98000, 115000, 120000, 125000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Investment',
        data: [100000, 100000, 100000, 100000, 100000, 100000],
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '₹' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default PortfolioChart;