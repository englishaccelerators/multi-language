import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function QuizReviewPage({ token }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get('http://localhost:8000/api/student/quiz-history/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load quiz history:', err);
      }
    }
    fetchHistory();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📊 Your Quiz History</h2>

      {history.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((q, index) => (
              <tr key={index}>
                <td className="p-2 border capitalize">{q.section}</td>
                <td className="p-2 border">{q.group_code}</td>
                <td className="p-2 border">{q.score}/{q.total}</td>
                <td className="p-2 border">{new Date(q.date_taken).toLocaleDateString()}</td>
                <td className={`p-2 border ${q.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {q.passed ? 'Mastered' : 'Incomplete'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
