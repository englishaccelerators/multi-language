
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AIToggleDashboard = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = () => {
    axios.get('/api/ai-toggle-suggestions/').then(res => {
      setSuggestions(res.data);
    });
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleAction = (id, status) => {
    axios.patch(`/api/ai-toggle-suggestions/${id}/`, { status }).then(fetchSuggestions);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        AI Toggle Suggestions
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {suggestions.filter(s => s.status === 'pending').length} pending
        </span>
      </h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Feature</th>
            <th className="p-2 border">Suggested</th>
            <th className="p-2 border">Confidence</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
            <th className="p-2 border">Reason</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((s, i) => (
            <tr key={i} className={s.status === 'pending' ? 'bg-yellow-50' : ''}>
              <td className="p-2 border">{s.feature_name}</td>
              <td className="p-2 border">{s.suggested_state ? 'Enable' : 'Disable'}</td>
              <td className="p-2 border">{(s.confidence * 100).toFixed(1)}%</td>
              <td className="p-2 border">{s.status}</td>
              <td className="p-2 border space-x-2">
                {s.status === 'pending' && (
                  <>
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleAction(s.id, 'accepted')}>
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleAction(s.id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
              </td>
              <td className="p-2 border">{s.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AIToggleDashboard;
