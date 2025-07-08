import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function Suffixes() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchSuffixes() {
      try {
        const res = await axios.get('/api/suffix-groups/');
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to load suffixes:', err);
      }
    }
    fetchSuffixes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-pink-800 mb-6">🔚 Suffix Groups</h1>

      {groups.length === 0 ? (
        <p className="text-gray-600">No suffix groups available.</p>
      ) : (
        groups.map((group, i) => (
          <div key={i} className="mb-6 border p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-pink-700">
              {group.suffix} — {group.meaning}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm mt-2">
              {group.examples.map((word, idx) => (
                <li key={idx} className="bg-pink-50 p-2 rounded border text-center">{word}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
