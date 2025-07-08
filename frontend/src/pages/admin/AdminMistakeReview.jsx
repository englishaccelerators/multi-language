// ✅ AdminMistakeReview.jsx — View All Student Mistakes + Export
import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function AdminMistakeReview() {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    async function fetchAllMistakes() {
      const res = await axios.get('/mistakes/student/?admin_view=true');
      setMistakes(res.data);
    }
    fetchAllMistakes();
  }, []);

  const handleExport = () => {
    window.open('/admin-api/mistakes/export/', '_blank');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 All Student Mistakes</h2>
      <button
        onClick={handleExport}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Export to CSV
      </button>

      {mistakes.length === 0 ? (
        <p>No mistakes found.</p>
      ) : (
        <table className="table-auto w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student</th>
              <th className="border p-2">Section</th>
              <th className="border p-2">Tool</th>
              <th className="border p-2">Mistake</th>
              <th className="border p-2">Correct</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mistakes.map((m, i) => (
              <tr key={i}>
                <td className="border p-2">{m.student_username}</td>
                <td className="border p-2">{m.section}</td>
                <td className="border p-2">{m.tool_code}</td>
                <td className="border p-2 text-red-600">{m.input_given}</td>
                <td className="border p-2 text-green-600">{m.correct_text}</td>
                <td className="border p-2">{m.mistake_type}</td>
                <td className="border p-2">{new Date(m.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
