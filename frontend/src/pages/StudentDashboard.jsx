import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function StudentDashboard({ token }) {
  const [quizHistory, setQuizHistory] = useState([]);
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res1 = await axios.get('http://localhost:8000/api/student/attempts/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizHistory(res1.data);

        const res2 = await axios.get('http://localhost:8000/api/student/mistakes/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMistakes(res2.data);
      } catch (err) {
        console.error('Error loading student dashboard:', err);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🎓 Student Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">📊 Quiz History</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Section</th>
              <th className="p-2">Quiz Type</th>
              <th className="p-2">Score (%)</th>
              <th className="p-2">Date</th>
              <th className="p-2">Trophy</th>
            </tr>
          </thead>
          <tbody>
            {quizHistory.map((q, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{q.section}</td>
                <td className="p-2">{q.quiz_type}</td>
                <td className="p-2">{q.score}</td>
                <td className="p-2">{new Date(q.completed_on).toLocaleDateString()}</td>
                <td className="p-2">{q.trophy_earned ? '🏆' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <a
            href="/practice-mistakes"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
          >
            🛠️ Practice Your Mistakes
          </a>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Your Mistakes</h3>
        <ul className="list-disc ml-6 text-sm text-gray-800">
          {mistakes.map((m, i) => (
            <li key={i} className="mb-1">
              <strong>{m.word}</strong> in {m.section} ➜ You typed "{m.attempt_text}" — Correct: "{m.correct_text}"
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
