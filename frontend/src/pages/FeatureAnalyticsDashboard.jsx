
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FeatureAnalyticsDashboard = () => {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/feature-usage/').then(res => {
      setUsageData(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Usage Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={usageData}>
          <XAxis dataKey="feature_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4C51BF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureAnalyticsDashboard;
