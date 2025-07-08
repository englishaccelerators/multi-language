import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

export default function FinalExam() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [examTitle, setExamTitle] = useState('');

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await axios.get('/api/final-exam/');
        setQuestions(res.data.questions || []);
        setExamTitle(res.data.title || "Comprehensive Final Exam");
      } catch (err) {
        console.error('Failed to load exam', err);
      }
    }
    fetchExam();
  }, []);

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      const user = (answers[i] || '').trim().toLowerCase();
      const actual = (q.word || '').trim().toLowerCase();
      if (user === actual) correct++;
    });
    const percent = ((correct / questions.length) * 100).toFixed(2);
    setScore(percent);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">
        🎓 {examTitle}
      </h1>

      {!submitted && (
        <>
          <p className="mb-4 text-gray-700">
            This exam will test you across all major sections of the English Learning System:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>📘 Dictionary</li>
            <li>🔠 Prefixes</li>
            <li>🔚 Suffixes</li>
            <li>📕 Advanced Vocabulary</li>
            <li>🎧 Pronunciation</li>
            <li>✍️ Spelling</li>
            <li>🌀 Rhythm</li>
            <li>📑 Grammar</li>
            <li>🔤 Verb Forms</li>
          </ul>
          <div className="p-4 border-l-4 border-green-500 bg-green-50 mb-6">
            <p className="text-green-800 font-medium">
              🧠 Your score will be broken down by section. Use it to identify your strengths and weaknesses!
            </p>
          </div>
        </>
      )}

      {submitted ? (
        <div className="text-green-700 text-lg font-semibold">
          ✅ Your Final Score: {score}%
        </div>
      ) : (
        <>
          {questions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="mb-1 text-sm">
                {i + 1}. What is this word from the <strong>{q.section}</strong> section?
              </p>
              <input
                type="text"
                className="border p-2 w-full rounded"
                value={answers[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Type your answer"
              />
            </div>
          ))}

          {questions.length > 0 && (
            <button
              className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700"
              onClick={handleSubmit}
            >
              ✅ Submit Final Exam
            </button>
          )}
        </>
      )}
    </div>
  );
}
