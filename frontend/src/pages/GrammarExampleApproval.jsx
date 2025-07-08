
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GrammarExampleApproval = () => {
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    axios.get('/api/user-examples/').then(res => {
      setExamples(res.data);
    });
  }, []);

  const approveExample = (id) => {
    axios.patch(`/api/user-examples/${id}/`, { approved: true }).then(() => {
      setExamples(prev => prev.map(ex => ex.id === id ? { ...ex, approved: true } : ex));
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🛡️ Approve User-Submitted Grammar Examples</h2>
      <ul className="space-y-3 text-sm">
        {examples.filter(ex => !ex.approved).map(ex => (
          <li key={ex.id} className="border p-3 rounded">
            <div><strong>{ex.grammar_tag}:</strong> {ex.sentence}</div>
            <button onClick={() => approveExample(ex.id)} className="bg-green-500 text-white mt-2 px-3 py-1 rounded">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrammarExampleApproval;
