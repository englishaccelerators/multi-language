
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GrammarPathManager = () => {
  const [paths, setPaths] = useState([]);
  const [title, setTitle] = useState('');
  const [lessonIds, setLessonIds] = useState('');

  useEffect(() => {
    axios.get('/api/grammar-paths/').then(res => setPaths(res.data));
  }, []);

  const createPath = () => {
    axios.post('/api/grammar-paths/', {
      title,
      lesson_ids: lessonIds.split(',').map(id => parseInt(id.trim()))
    }).then(res => {
      setPaths(prev => [...prev, res.data]);
      setTitle('');
      setLessonIds('');
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🧭 Grammar Path Manager</h2>
      <div className="flex gap-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="border px-2 py-1 w-1/2" placeholder="Path Title" />
        <input value={lessonIds} onChange={e => setLessonIds(e.target.value)} className="border px-2 py-1 w-1/2" placeholder="Lesson IDs (comma-separated)" />
        <button onClick={createPath} className="bg-blue-600 text-white px-4 py-1 rounded">Create</button>
      </div>
      <ul className="space-y-2 text-sm">
        {paths.map(path => (
          <li key={path.id} className="border p-2 rounded shadow">
            <strong>{path.title}</strong> → Lessons: {path.lesson_ids.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrammarPathManager;
