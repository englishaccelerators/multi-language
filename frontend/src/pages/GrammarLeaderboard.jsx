
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GrammarLeaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/grammar-usage/leaderboard/').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🏅 Grammar Leaderboard</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Lessons Completed</th>
            <th className="p-2 border">Avg Score</th>
          <th className="p-2 border">Certificate</th>
// Extend each row in the leaderboard to show certificate status
<td className="p-2 border">
  {entry.certificate_awarded ? '🏅' : '—'}
</td>

          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i}>
              <td className="p-2 border">{entry.username}</td>
              <td className="p-2 border">{entry.completed}</td>
              <td className="p-2 border">{entry.average_score.toFixed(2)}</td>
            <th className="p-2 border">Certificate</th>
// Extend each row in the leaderboard to show certificate status
<td className="p-2 border">
  {entry.certificate_awarded ? '🏅' : '—'}
</td>

          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrammarLeaderboard;
