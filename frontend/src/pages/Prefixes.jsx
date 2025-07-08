import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function Prefixes() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchPrefixes() {
      try {
        const res = await axios.get('/api/prefix-groups/');
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to load prefixes:', err);
      }
    }
    fetchPrefixes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">🔤 Prefix Groups</h1>

      {groups.length === 0 ? (
        <p className="text-gray-600">No prefix groups available.</p>
      ) : (
        groups.map((group, i) => (
          <div key={i} className="mb-6 border p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-blue-700">
              {group.prefix} — {group.meaning}
            </h2>
            {group.spelling_rule && (
              <p className="text-sm text-gray-600 italic mb-2">
                Spelling Rule: {group.spelling_rule}
              </p>
            )}
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
              {group.words.map((word, idx) => (
                <li key={idx} className="bg-blue-50 p-2 rounded border text-center">{word}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
