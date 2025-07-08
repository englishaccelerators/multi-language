
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardDashboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard/').then(res => {
      setLeaders(res.data);
    });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🏆 Global Leaderboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">XP</th>
            <th className="p-2 border">Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.xp}</td>
              <td className="p-2 border">{user.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardDashboard;
