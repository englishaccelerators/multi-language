
import React, { useEffect, useState } from 'react';
import axios from '../auth/axiosWithAuth';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard/')
      .then(res => setEntries(res.data))
      .catch(err => console.error('Failed to load leaderboard', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Learners</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Rank</th>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">XP</th>
            <th className="border px-2 py-1">Badge</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.user}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{entry.username}</td>
              <td className="border px-2 py-1">{entry.xp}</td>
              <td className="border px-2 py-1">{entry.badge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
