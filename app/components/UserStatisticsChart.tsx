// components/UserStatisticsChart.tsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserStatisticsChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] as { label: string; data: number[]; borderColor: string; backgroundColor: string; }[] });
  const [chartKey, setChartKey] = useState(0); // key for forcing chart re-render

  useEffect(() => {
    // This is where you would fetch data from your MongoDB
    const fetchData = async () => {
      // const response = await fetch('/api/user-stats');
      // const data = await response.json();

      const data = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Total Users',
            data: [2, 3, 50, 4, 60, 10, 13, 93, 13, 11, 120, 30],
            borderColor: '#4a90e2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
          },
          {
            label: 'Total Subscription Users',
            data: [1, 1, 2, 3, 40, 0, 50, 60, 70, 80, 85, 90],
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        ],
      };

      setChartData(data);
      setChartKey(prevKey => prevKey + 1);
    };

    fetchData();

    const handleResize = () => {
      setChartKey(prevKey => prevKey + 1); // force re-render
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <Line data={chartData} options={options} key={chartKey} />
    </div>
  );
};

export default UserStatisticsChart;
