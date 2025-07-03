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

interface SIPChartProps {
  data: Array<{
    year: number;
    investment: number;
    value: number;
  }>;
}

const SIPChart: React.FC<SIPChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => `Year ${item.year}`),
    datasets: [
      {
        label: 'Investment Value',
        data: data.map(item => item.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total Investment',
        data: data.map(item => item.investment),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
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
        text: 'SIP Growth Projection',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '₹' + (value / 100000).toFixed(1) + 'L';
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SIPChart;