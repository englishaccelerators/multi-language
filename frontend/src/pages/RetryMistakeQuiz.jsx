// ✅ RetryMistakeQuiz.jsx — Based on last 5 mistakes (Fixed + Audio)
import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function RetryMistakeQuiz() {
  const [mistakes, setMistakes] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function fetchMistakes() {
      const res = await axios.get('/mistakes/student/');
      const latest = res.data.slice(0, 5);
      setMistakes(latest);
    }
    fetchMistakes();
  }, []);

  if (mistakes.length === 0) return <p className="p-6">No recent mistakes to retry.</p>;

  const current = mistakes[index];

  const handleSubmit = () => {
    const correct = input.trim().toLowerCase() === current.correct_text.toLowerCase();
    setFeedback(correct ? '✅ Correct!' : `❌ Incorrect. Correct: ${current.correct_text}`);
  };

  const handleNext = () => {
    setInput('');
    setFeedback(null);
    setIndex(prev => (prev + 1) % mistakes.length);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔁 Retry Mistake Quiz</h2>

      <p className="text-lg mb-2">
        <strong>Tool:</strong> {current.tool_code}<br />
        <strong>Word or Phrase:</strong> {current.word_or_phrase}
      </p>

      <button
        onClick={() =>
          new Audio(`https://s3.amazonaws.com/newfileaudio/words/uk/${current.word_or_phrase}.mp3`).play()
        }
        className="btn mb-2"
      >
        🔊 Play Audio
      </button>

      <input
        className="border p-2 w-full rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Retry your answer"
      />

      <button className="btn mr-2" onClick={handleSubmit}>Submit</button>
      <button className="btn bg-gray-400" onClick={handleNext}>Next</button>

      {feedback && <p className="mt-3 font-bold text-lg">{feedback}</p>}
    </div>
  );
}
