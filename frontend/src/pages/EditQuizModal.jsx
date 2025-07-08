import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function EditQuizModal({ quiz, token, onClose, onSave }) {
  const [form, setForm] = useState({ ...quiz });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/admin/quiz/${form.id}/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave();
      onClose();
    } catch (err) {
      console.error('Error saving quiz:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">📝 Edit Quiz</h2>

        <label className="block mb-1">Section</label>
        <input
          name="section"
          value={form.section}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">Group Code</label>
        <input
          name="group_code"
          value={form.group_code}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">Quiz Type</label>
        <input
          name="quiz_type"
          value={form.quiz_type}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">Assignment Scope</label>
        <select
          name="assignment_scope"
          value={form.assignment_scope}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        >
          <option value="global">Global</option>
          <option value="class">Class</option>
          <option value="builder">Builder</option>
        </select>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
