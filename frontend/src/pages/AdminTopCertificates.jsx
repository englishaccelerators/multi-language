import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function AdminTopCertificates({ token }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/certificate-leaders/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaders(res.data);
      } catch (err) {
        console.error('Failed to load certificate leaderboard:', err);
      }
    }
    fetchLeaders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎓 Top Certificate Earners</h2>
      <table className="w-full border text-sm">
        <thead className="bg-indigo-100">
          <tr>
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Certificates</th>
            <th className="p-2 border">Last Awarded</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((stu, i) => (
            <tr key={i}>
              <td className="p-2 border font-bold">#{i + 1}</td>
              <td className="p-2 border">{stu.username}</td>
              <td className="p-2 border text-green-700">{stu.certificate_count}</td>
              <td className="p-2 border">{new Date(stu.last_awarded).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
