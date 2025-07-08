import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizFormatEditor() {
  const [groupType, setGroupType] = useState('prefix');
  const [groupCode, setGroupCode] = useState('');
  const [formats, setFormats] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [status, setStatus] = useState('');

  // Load all quiz format definitions
  useEffect(() => {
    async function fetchFormats() {
      const res = await axios.get('/api/admin/quiz-format-catalog/');
      setFormats(res.data);
    }
    fetchFormats();
  }, []);

  // Load assignments for current group
  useEffect(() => {
    if (groupCode) {
      axios
        .get(`/api/admin/group-quiz-assignment/?group_type=${groupType}&group_code=${groupCode}`)
        .then((res) => {
          const current = {};
          res.data.forEach((a) => {
            current[a.quiz_format] = a.is_enabled;
          });
          setAssignments(current);
        })
        .catch(() => {
          setAssignments({});
        });
    }
  }, [groupType, groupCode]);

  const toggle = (code) => {
    setAssignments({ ...assignments, [code]: !assignments[code] });
  };

  const save = async () => {
    setStatus('Saving...');
    try {
      for (const format of formats) {
        await axios.post('/api/admin/group-quiz-assignment/', {
          group_type: groupType,
          group_code: groupCode,
          quiz_format: format.code,
          is_enabled: !!assignments[format.code],
        });
      }
      setStatus('✅ Saved successfully');
    } catch {
      setStatus('❌ Save failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🧩 Quiz Format Manager</h2>

      <div className="flex gap-4 mb-6">
        <select value={groupType} onChange={(e) => setGroupType(e.target.value)} className="border p-2 rounded">
          <option value="prefix">Prefix</option>
          <option value="suffix">Suffix</option>
          <option value="advanced">Advanced Root</option>
          <option value="vocabulary">Vocabulary</option>
          <option value="pronunciation">Pronunciation</option>
          <option value="spelling">Spelling</option>
          <option value="rhythm">Rhythm</option>
        </select>
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter group code (e.g., ad-1)"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
        />
      </div>

      {formats.map((f) => (
        <label key={f.code} className="block my-2">
          <input
            type="checkbox"
            checked={!!assignments[f.code]}
            onChange={() => toggle(f.code)}
            className="mr-2"
          />
          <strong>{f.label}</strong> — {f.description}
        </label>
      ))}

      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={!groupCode}
      >
        💾 Save Format Settings
      </button>

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
}
