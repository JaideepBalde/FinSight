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

interface ForecastChartProps {
  period: string;
  prediction: {
    return: number;
    confidence: number;
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ period, prediction }) => {
  const generateForecastData = () => {
    const months = period === '6M' ? 6 : period === '1Y' ? 12 : period === '2Y' ? 24 : 60;
    const monthlyReturn = prediction.return / 12 / 100;
    const currentValue = 125000; // Starting portfolio value

    const labels = [];
    const values = [];
    const upperBound = [];
    const lowerBound = [];

    for (let i = 0; i <= months; i++) {
      if (i === 0) {
        labels.push('Now');
        values.push(currentValue);
        upperBound.push(currentValue);
        lowerBound.push(currentValue);
      } else {
        const month = i <= 12 ? `${i}M` : `${Math.floor(i / 12)}Y${i % 12 > 0 ? ` ${i % 12}M` : ''}`;
        labels.push(month);
        
        const expectedValue = currentValue * Math.pow(1 + monthlyReturn, i);
        const volatility = 0.15; // 15% volatility
        const confidenceInterval = expectedValue * volatility * (1 - prediction.confidence / 100);
        
        values.push(expectedValue);
        upperBound.push(expectedValue + confidenceInterval);
        lowerBound.push(expectedValue - confidenceInterval);
      }
    }

    return { labels, values, upperBound, lowerBound };
  };

  const data = generateForecastData();

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Predicted Value',
        data: data.values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Upper Bound',
        data: data.upperBound,
        borderColor: 'rgba(16, 185, 129, 0.5)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: '+1',
        tension: 0.4,
        pointRadius: 0,
        borderDash: [5, 5],
      },
      {
        label: 'Lower Bound',
        data: data.lowerBound,
        borderColor: 'rgba(239, 68, 68, 0.5)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
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
        text: `Portfolio Forecast - ${period}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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

export default ForecastChart;