
import React, { useState } from 'react';
import axios from '../auth/axiosWithAuth';

const AskGPT = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    try {
      const res = await axios.post('/ai/ask/', { prompt: question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Error: ' + (err.response?.data?.error || 'Request failed'));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ask GPT 💬</h1>
      <form onSubmit={askAI}>
        <textarea
          className="border p-2 w-full mb-2"
          rows="4"
          placeholder="Ask any English-related question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask GPT'}
        </button>
      </form>
      {answer && (
        <div className="mt-4 border p-4 bg-gray-100 rounded">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskGPT;
