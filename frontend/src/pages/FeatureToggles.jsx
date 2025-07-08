
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeatureToggles = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get('/api/feature-toggles/').then(res => {
      setFeatures(res.data);
    });
  }, []);

  const toggleFeature = (id, currentState) => {
    axios.patch(`/api/feature-toggles/${id}/`, { is_enabled: !currentState })
      .then(() => {
        setFeatures(features.map(f => f.id === id ? { ...f, is_enabled: !currentState } : f));
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Feature Toggles</h2>
      <ul>
        {features.map(feature => (
          <li key={feature.id} className="flex justify-between items-center mb-2">
            <span>{feature.feature_name}</span>
            <button
              onClick={() => toggleFeature(feature.id, feature.is_enabled)}
              className={`px-3 py-1 rounded ${feature.is_enabled ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {feature.is_enabled ? 'Enabled' : 'Disabled'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureToggles;
