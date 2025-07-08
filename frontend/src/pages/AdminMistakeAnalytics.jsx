import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function AdminMistakeAnalytics({ token }) {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    async function fetchMistakes() {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/mistakes/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMistakes(res.data);
      } catch (err) {
        console.error('Failed to load mistake logs:', err);
      }
    }
    fetchMistakes();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-700">❌ Mistake Analytics</h2>

      {mistakes.length === 0 ? (
        <p>No mistakes logged yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-red-100">
            <tr>
              <th className="p-2 border">Word</th>
              <th className="p-2 border">Mistake Type</th>
              <th className="p-2 border">Typed</th>
              <th className="p-2 border">Correct</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {mistakes.map((m, i) => (
              <tr key={i}>
                <td className="p-2 border font-semibold">{m.word}</td>
                <td className="p-2 border">{m.mistake_type}</td>
                <td className="p-2 border text-red-600">{m.attempt_text}</td>
                <td className="p-2 border text-green-700">{m.correct_text}</td>
                <td className="p-2 border">{m.section}</td>
                <td className="p-2 border">{m.student}</td>
                <td className="p-2 border">{new Date(m.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
