// ✅ PrefixMatchingQuiz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PrefixMatchingQuiz() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    const res = await axios.get('/api/prefix-groups/');
    const groups = res.data.filter(g => g.words.length >= 1);
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    const correctWord = randomGroup.words[0];
    const wrongWords = groups.filter(g => g.prefix !== randomGroup.prefix).slice(0, 3).map(g => g.words[0]);

    const choices = [...wrongWords, correctWord].sort(() => Math.random() - 0.5);
    setQuestion({
      prefix: randomGroup.prefix,
      meaning: randomGroup.meaning,
      correct: correctWord,
      choices
    });
  };

  const handleSelect = (word) => {
    setSelected(word);
    setFeedback(word === question.correct ? '✅ Correct' : `❌ Wrong — Answer: ${question.correct}`);
  };

  return question ? (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">Prefix Match</h3>
      <p className="mb-2">What word uses the prefix <strong>{question.prefix}</strong> (meaning: {question.meaning})?</p>

      <div className="space-y-2">
        {question.choices.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(word)}
            className={`block w-full text-left border p-2 rounded ${selected === word ? 'bg-gray-200' : ''}`}
          >
            {word}
          </button>
        ))}
      </div>

      {feedback && <p className="mt-4 font-bold">{feedback}</p>}
    </div>
  ) : <p>Loading prefix quiz...</p>;
}
