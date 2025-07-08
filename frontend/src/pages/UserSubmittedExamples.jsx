
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserSubmittedExamples = () => {
  const [examples, setExamples] = useState([]);
  const [sentence, setSentence] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    axios.get('/api/user-examples/').then(res => setExamples(res.data));
  }, []);

  const submitExample = () => {
    axios.post('/api/user-examples/', { sentence, grammar_tag: tag }).then(res => {
      setExamples(prev => [...prev, res.data]);
      setSentence('');
      setTag('');
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📤 Submit a Grammar Example</h2>
      <div className="flex gap-2 mb-4">
        <input value={sentence} onChange={e => setSentence(e.target.value)} placeholder="Your sentence" className="border px-2 py-1 w-2/3" />
        <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Grammar tag" className="border px-2 py-1 w-1/3" />
        <button onClick={submitExample} className="bg-green-600 text-white px-4 py-1 rounded">Submit</button>
      </div>
      <ul className="space-y-1 text-sm">
        {examples.map((ex, i) => (
          <li key={i}>✅ {ex.grammar_tag}: {ex.sentence}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserSubmittedExamples;
