
import React, { useState } from 'react';

const AssignQuizForm = ({ onAssign }) => {
  const [word, setWord] = useState('');
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAssign({ word, identifier });
    setWord('');
    setIdentifier('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-bold mb-2">Assign Quiz</h2>
      <input className="border p-2 mr-2" placeholder="Word" value={word} onChange={e => setWord(e.target.value)} />
      <input className="border p-2 mr-2" placeholder="Identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Assign</button>
    </form>
  );
};

export default AssignQuizForm;
