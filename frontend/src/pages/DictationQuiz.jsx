// ✅ DictationQuiz.jsx — Smart Sentence + Word Dictation
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EXAMPLE = {
  sentence: "She walks to school every day.",
  word: "walks",
  audio_sentence_uk: "https://s3.amazonaws.com/exampleenglishfordictionary/UK/walk-v-1-D-E-1-UK.mp3",
  audio_word_uk: "https://s3.amazonaws.com/newfileaudio/words/uk/walk.mp3",
  identifiercode: "walk-v-1-D-E-1"
};

function DictationQuiz() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null);

  const playAudio = async (url) => {
    try {
      const audio = new Audio(url);
      await audio.play();
    } catch (error) {
      console.error('Audio failed to play:', error);
    }
  };

  const handleSubmit = async () => {
    const isCorrect = input.trim().toLowerCase() === EXAMPLE.sentence.toLowerCase();
    setStatus(isCorrect ? '✅ Correct!' : '❌ Incorrect.');

    try {
      await axios.post('/interactive/tools/log-usage/', {
        tool: 'DICTATION_SENTENCE',
        section: 'vocabulary',
        completed: true,
        score: isCorrect ? 1 : 0
      });
    } catch (error) {
      console.error('Failed to submit log usage:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🎧 Dictation Quiz</h2>

      <div className="flex gap-4 mb-4">
        <button className="btn" onClick={() => playAudio(EXAMPLE.audio_sentence_uk)}>🔊 Play Sentence</button>
        <button className="btn" onClick={() => playAudio(EXAMPLE.audio_word_uk)}>🔈 Play Word</button>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type what you heard..."
        className="w-full border p-2 rounded"
      />

      <button className="btn mt-4" onClick={handleSubmit}>Submit</button>

      {status && <p className="mt-4 font-bold text-lg">{status}</p>}
    </div>
  );
}

export default DictationQuiz;
