// ✅ QuizFormatEditor.jsx
import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function QuizFormatEditor() {
  const [section, setSection] = useState('prefix');
  const [groupCode, setGroupCode] = useState('');
  const [formats, setFormats] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function fetchFormats() {
      try {
        const res = await axios.get('/api/admin/quiz-format-catalog/');
        setFormats(res.data);
      } catch (err) {
        console.error('Error loading formats', err);
      }
    }
    fetchFormats();
  }, []);

  async function loadAssignments() {
    setStatus('Loading...');
    try {
      const res = await axios.get('/api/admin/group-quiz-assignment/', {
        params: { section, group_code: groupCode },
      });
      setSelectedFormats(res.data.enabled_format_codes);
      setStatus('Loaded');
    } catch (err) {
      console.error(err);
      setStatus('Failed to load');
    }
  }

  async function saveAssignments() {
    try {
      await axios.post('/api/admin/group-quiz-assignment/', {
        section,
        group_code: groupCode,
        format_codes: selectedFormats,
      });
      setStatus('Saved ✅');
    } catch (err) {
      console.error(err);
      setStatus('Save failed ❌');
    }
  }

  function toggleFormat(code) {
    setSelectedFormats((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">🧠 Quiz Format Editor (Admin)</h2>

      <div className="mb-4">
        <label className="block font-semibold">Section:</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="prefix">Prefix</option>
          <option value="suffix">Suffix</option>
          <option value="root">Advanced Root</option>
          <option value="vocabulary">Vocabulary</option>
          <option value="pronunciation">Pronunciation</option>
          <option value="spelling">Spelling</option>
          <option value="rhythm">Rhythm</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Group Code:</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          placeholder="e.g., ad-1"
        />
      </div>

      <button onClick={loadAssignments} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Load Formats
      </button>

      {formats.map((f) => (
        <div key={f.code} className="mb-1">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFormats.includes(f.code)}
              onChange={() => toggleFormat(f.code)}
            />
            <span>{f.label}</span>
          </label>
        </div>
      ))}

      <button onClick={saveAssignments} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
        Save Assignments
      </button>

      <div className="text-sm text-gray-500 mt-2">{status}</div>
    </div>
  );
}
