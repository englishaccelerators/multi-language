import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function StudentMistakeReview() {
  const [mistakes, setMistakes] = useState([]);
  const [input, setInput] = useState('');
  const [retryWord, setRetryWord] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function fetchMistakes() {
      try {
        const res = await axios.get('/mistakes/student/');
        setMistakes(res.data);
      } catch (error) {
        console.error('Failed to fetch mistakes:', error);
      }
    }
    fetchMistakes();
  }, []);

  const handleRetry = (mistake) => {
    setRetryWord(mistake);
    setInput('');
    setFeedback(null);
  };

  const handleSubmitRetry = () => {
    const correct =
      input.trim().toLowerCase() === retryWord.correct_text.toLowerCase();
    setFeedback(
      correct
        ? '✅ Correct on retry!'
        : `❌ Incorrect. Correct: ${retryWord.correct_text}`
    );
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-4">📉 Mistake Review</h3>
      {mistakes.length === 0 ? (
        <p className="text-gray-500">No mistakes recorded yet.</p>
      ) : (
        <ul className="space-y-4">
          {mistakes.map((m, i) => (
            <li key={i} className="border p-3 rounded bg-white">
              <p>
                <strong>Tool:</strong> {m.tool_code}
              </p>
              <p>
                <strong>Your Answer:</strong>{' '}
                <span className="text-red-600">{m.input_given}</span>
              </p>
              <p>
                <strong>Correct:</strong>{' '}
                <span className="text-green-600">{m.correct_text}</span>
              </p>
              <p>
                <strong>Type:</strong> {m.mistake_type}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(m.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleRetry(m)}
                className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded"
              >
                🔁 Retry This
              </button>
            </li>
          ))}
        </ul>
      )}

      {retryWord && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-bold mb-2">
            Retry: {retryWord.word_or_phrase}
          </h4>
          <input
            className="border p-2 w-full mb-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your retry answer"
          />
          <button
            onClick={handleSubmitRetry}
            className="btn bg-blue-600 text-white px-4 py-1 rounded"
          >
            Submit Retry
          </button>
          {feedback && <p className="mt-2 font-bold">{feedback}</p>}
        </div>
      )}
    </div>
  );
}
