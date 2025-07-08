// ✅ src/pages/VocabularyAdvanced.jsx — Fixed alias and interactive root tool section
import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';
// ✅ Corrected alias path
import StudentToolLoader from './StudentToolLoader';

export default function VocabularyAdvanced() {
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    async function fetchRoots() {
      try {
        const res = await axios.get('/api/advanced-root-groups/');
        setRoots(res.data);
      } catch (err) {
        console.error('Failed to load root groups:', err);
      }
    }
    fetchRoots();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-rose-700 mb-6">📚 Advanced Root Vocabulary</h1>

      {roots.length === 0 ? (
        <p className="text-gray-600">No root groups available.</p>
      ) : (
        roots.map((group, i) => (
          <div key={i} className="bg-white rounded shadow mb-6 p-4 border-l-4 border-rose-500">
            <h2 className="text-xl font-semibold text-rose-700">
              {group.code} — {group.root_meaning}
            </h2>
            <table className="table-auto w-full mt-4 text-sm border">
              <thead>
                <tr className="bg-rose-100">
                  <th className="border p-2">Word</th>
                  <th className="border p-2">Morpheme</th>
                  <th className="border p-2">Definition</th>
                  <th className="border p-2">Related</th>
                </tr>
              </thead>
              <tbody>
                {group.words.map((w, j) => (
                  <tr key={j}>
                    <td className="border p-2">{w.word}</td>
                    <td className="border p-2">{w.morpheme_break}</td>
                    <td className="border p-2">{w.definition}</td>
                    <td className="border p-2">{w.related}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* ✅ Interactive Learning Tools */}
      <StudentToolLoader section="vocabulary" />
    </div>
  );
}
