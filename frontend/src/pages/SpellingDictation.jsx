import React, { useState } from 'react';
import { logMistake } from '../services/logMistake';

const example = {
  text: "accommodate",
  audio: "https://s3.amazonaws.com/newfileaudio/words/uk/accommodate.mp3",
};

export default function SpellingDictation({ token }) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(null);

  const playAudio = () => {
    const audio = new Audio(example.audio);
    audio.play();
  };

  const handleSubmit = async () => {
    const isCorrect = input.trim().toLowerCase() === example.text;
    setCorrect(isCorrect);
    setSubmitted(true);

    if (!isCorrect) {
      await logMistake({
        section: "spelling",
        tool_code: "SPELLING_DICTATION",
        word_or_phrase: example.text,
        input_given: input,
        correct_text: example.text,
        mistake_type: "spelling"
      }, token);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">📝 Spelling Dictation</h3>
      <button className="btn mb-3" onClick={playAudio}>🔊 Play Word</button>
      <input
        className="border p-2 w-full rounded"
        placeholder="Type the word you hear"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={submitted}
      />
      <button className="btn mt-2" onClick={handleSubmit}>Submit</button>
      {submitted && (
        <p className={`mt-2 font-bold ${correct ? 'text-green-600' : 'text-red-600'}`}>
          {correct ? '✅ Correct' : `❌ Incorrect — Answer: ${example.text}`}
        </p>
      )}
    </div>
  );
}
