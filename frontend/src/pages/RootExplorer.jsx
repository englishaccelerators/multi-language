import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function RootExplorer() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchRoots() {
      const res = await axios.get('/api/advanced-root-groups/');
      setGroups(res.data);
    }
    fetchRoots();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">🧠 Root Explorer</h3>
      {groups.length === 0 ? (
        <p>Loading...</p>
      ) : (
        groups.map((group, i) => (
          <div key={i} className="mb-4">
            <h4 className="text-lg font-bold text-blue-700">{group.code} – {group.root_meaning}</h4>
            <ul className="list-disc ml-5">
              {group.words.map((word, j) => (
                <li key={j}>{word.word} — {word.definition}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
