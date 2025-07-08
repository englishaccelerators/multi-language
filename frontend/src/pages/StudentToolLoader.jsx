// ✅ StudentToolLoader.jsx — Renders tools assigned to the section
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 📦 Tool components
import DictationQuiz from './DictationQuiz';
import PrefixMatchingQuiz from './PrefixMatchingQuiz';
import SpellingDictation from './SpellingDictation';
import RootExplorer from './RootExplorer';
import GrammarFillQuiz from './GrammarFillQuiz';
import StudentMistakeReview from './StudentMistakeReview';
import FlashcardMatch from './FlashcardMatch';

// 🧠 Tool map
const TOOL_COMPONENTS = {
  DICTATION_SENTENCE: <DictationQuiz section="vocabulary" />,
  PREFIX_MATCH: <PrefixMatchingQuiz />,
  SPELLING_DICTATION: <SpellingDictation />,
  ROOT_EXPLORER: <RootExplorer />,
  GRAMMAR_FILL: <GrammarFillQuiz />,
  MISTAKE_REVIEW: <StudentMistakeReview />,
  FLASHCARD_MATCH: <FlashcardMatch />,
};

export default function StudentToolLoader({ section }) {
  const [toolCodes, setToolCodes] = useState([]);

  useEffect(() => {
    async function fetchTools() {
      try {
        const res = await axios.get(`/interactive/tools/by-section/${section}/`);
        setToolCodes(res.data.map(t => t.tool.tool_code));
      } catch (err) {
        console.error('Failed to fetch tools:', err);
      }
    }
    fetchTools();
  }, [section]);

  useEffect(() => {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      toolCodes.forEach(code => {
        axios.post('/interactive/tools/log-usage/', {
          tool: code,
          section,
          completed: true,
          score: 0,
          duration,
        });
      });
    };
  }, [toolCodes, section]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Learning Tools</h2>
      {toolCodes.length === 0 ? (
        <p className="text-gray-500">No tools assigned to this section yet.</p>
      ) : (
        toolCodes.map(code => (
          <div key={code} className="border p-4 rounded shadow">
            {TOOL_COMPONENTS[code] || <p>Tool not implemented: {code}</p>}
          </div>
        ))
      )}
    </div>
  );
}
