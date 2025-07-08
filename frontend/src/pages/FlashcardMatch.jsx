import React from 'react';

export default function FlashcardMatch() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🃏 Flashcard Match</h2>
      <p>This tool is under development. Matching flashcards will be added here soon.</p>
    </div>
  );
}

const TOOL_COMPONENTS = {
  DICTATION_SENTENCE: <DictationQuiz section="vocabulary" />,
  PREFIX_MATCH: <PrefixMatchingQuiz />,
  SPELLING_DICTATION: <SpellingDictation />,
  ROOT_EXPLORER: <RootExplorer />,
  GRAMMAR_FILL: <GrammarFillQuiz />,
  MISTAKE_REVIEW: <StudentMistakeReview />,
  FLASHCARD_MATCH: <FlashcardMatch />,
};
