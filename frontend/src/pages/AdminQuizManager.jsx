import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';
import EditQuizModal from './EditQuizModal';

export default function AdminQuizManager({ token }) {
  const [quizzes, setQuizzes] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, [token]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/quizzes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error('Failed to load quizzes:', err);
    }
  };

  const exportCSV = () => {
    const headers = ['Section', 'Group Code', 'Quiz Type', 'Questions', 'Scope'];
    const rows = quizzes.map((q) => [
      q.section,
      q.group_code,
      q.quiz_type,
      q.num_questions,
      q.assignment_scope,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'admin_quizzes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = quizzes.filter((q) =>
    filter ? q.section.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🧩 Admin Quiz Manager</h2>

      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Filter by Section:</label>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="e.g., spelling, prefix"
          />
        </div>
        <div>
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded">
            📤 Export CSV
          </button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Section</th>
            <th className="p-2 border">Group</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Questions</th>
            <th className="p-2 border">Scope</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, i) => (
            <tr key={i}>
              <td className="p-2 border">{q.section}</td>
              <td className="p-2 border">{q.group_code}</td>
              <td className="p-2 border">{q.quiz_type}</td>
              <td className="p-2 border">{q.num_questions}</td>
              <td className="p-2 border">{q.assignment_scope}</td>
              <td className="p-2 border">
                <button onClick={() => setSelectedQuiz(q)} className="text-blue-600 hover:underline">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuiz && (
        <EditQuizModal
          quiz={selectedQuiz}
          token={token}
          onClose={() => setSelectedQuiz(null)}
          onSave={fetchQuizzes}
        />
      )}
    </div>
  );
}
