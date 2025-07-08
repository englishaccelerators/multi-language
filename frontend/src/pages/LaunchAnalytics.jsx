
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaunchAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/feature-usage/').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Launch Analytics</h2>
      <ul className="text-lg space-y-2">
        {data.map((item, index) => (
          <li key={index}>🔹 {item.feature_name}: {item.count} uses</li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchAnalytics;
