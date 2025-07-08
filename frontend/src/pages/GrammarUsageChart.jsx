
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GrammarUsageChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('/api/grammar-usage/leaderboard/').then(res => {
      const labels = res.data.map(entry => entry.username);
      const scores = res.data.map(entry => entry.average_score);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Average Score',
            backgroundColor: '#4F46E5',
            borderRadius: 4,
            data: scores,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📊 Average Grammar Scores</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default GrammarUsageChart;
