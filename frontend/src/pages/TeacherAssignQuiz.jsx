import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function TeacherAssignQuiz({ token }) {
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState('spelling');
  const [groupCode, setGroupCode] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await axios.get('http://localhost:8000/api/teacher/classes/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Failed to load classes:', err);
      }
    }
    fetchClasses();
  }, [token]);

  const handleAssign = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/teacher/assign-homework/',
        {
          class_id: selectedClass,
          section,
          group_code: groupCode,
          due_date: dueDate
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Homework assigned successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to assign homework.');
    }
  };

  const [selectedClass, setSelectedClass] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📝 Assign Quiz to Class</h2>

      <label className="block mb-1">Select Class</label>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Select Class --</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>{cls.name}</option>
        ))}
      </select>

      <label className="block mb-1">Section</label>
      <select
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="spelling">Spelling</option>
        <option value="grammar">Grammar</option>
        <option value="vocabulary">Vocabulary</option>
        <option value="prefix">Prefix</option>
        <option value="suffix">Suffix</option>
        <option value="root">Root</option>
        <option value="rhythm">Rhythm</option>
      </select>

      <label className="block mb-1">Group Code (e.g. spelling-a-1)</label>
      <input
        type="text"
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter group code"
      />

      <label className="block mb-1">Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleAssign}
        disabled={!selectedClass || !groupCode || !dueDate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Assign Quiz
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
