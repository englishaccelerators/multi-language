import React, { useState } from 'react';

const question = {
  sentence: "She ___ to school every day.",
  answer: "goes",
  options: ["go", "goes", "gone", "going"]
};

export default function GrammarFillQuiz() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (choice) => {
    setSelected(choice);
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">📘 Grammar Fill-In</h3>
      <p className="mb-2 font-mono">{question.sentence.replace("___", "_____")}</p>
      <div className="space-y-2">
        {question.options.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleSelect(choice)}
            className={`block w-full p-2 rounded border ${
              submitted && choice === question.answer ? 'bg-green-100' :
              submitted && choice === selected ? 'bg-red-100' : ''
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      {submitted && (
        <p className="mt-3 font-bold">
          {selected === question.answer ? "✅ Correct!" : `❌ Incorrect. Answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
}

const audio = new Audio("https://s3.amazonaws.com/exampleenglishfordictionary/UK/go-v-1-D-E-1-UK.mp3");
