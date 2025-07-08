
import React, { useEffect, useState } from 'react';
import axios from '../../auth/axiosWithAuth';

const AdminAIControl = () => {
  const [config, setConfig] = useState({
    askgpt_enabled: false,
    elevenlabs_enabled: false,
    whisper_enabled: false,
    fallback_enabled: false
  });

  const fetchConfig = async () => {
    try {
      const res = await axios.get('/admin/ai-tools/');
      setConfig(res.data);
    } catch (err) {
      console.error('Failed to fetch AI config', err);
    }
  };

  const updateConfig = async (key) => {
    const updated = { ...config, [key]: !config[key] };
    try {
      await axios.post('/admin/ai-tools/', updated);
      setConfig(updated);
    } catch (err) {
      console.error('Failed to update AI config', err);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">AI Tool Controls</h1>
      {Object.keys(config).map(key => (
        <div key={key} className="mb-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={config[key]}
              onChange={() => updateConfig(key)}
            />
            {key.replace(/_/g, ' ')}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AdminAIControl;
