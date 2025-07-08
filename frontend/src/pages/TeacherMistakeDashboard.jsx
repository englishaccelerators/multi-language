import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function TeacherMistakeDashboard() {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get('/teacher/mistakes/');
      setMistakes(res.data);
    }
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👨‍🏫 Class Mistake Overview</h2>
      {mistakes.length === 0 ? (
        <p>No mistakes found for your class.</p>
      ) : (
        <table className="table-auto w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student</th>
              <th className="border p-2">Section</th>
              <th className="border p-2">Mistake</th>
              <th className="border p-2">Correct</th>
              <th className="border p-2">Tool</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mistakes.map((m, i) => (
              <tr key={i}>
                <td className="border p-2">{m.student_username}</td>
                <td className="border p-2">{m.section}</td>
                <td className="border p-2 text-red-600">{m.input_given}</td>
                <td className="border p-2 text-green-600">{m.correct_text}</td>
                <td className="border p-2">{m.tool_code}</td>
                <td className="border p-2">{new Date(m.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
