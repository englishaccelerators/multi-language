import React from 'react';

// ✅ Import all components used in TOOL_COMPONENTS
import DictationQuiz from './DictationQuiz';
import PrefixMatchingQuiz from './PrefixMatchingQuiz';
import SpellingDictation from './SpellingDictation';
import RootExplorer from './RootExplorer';
import GrammarFillQuiz from './GrammarFillQuiz';
import StudentMistakeReview from './StudentMistakeReview';

// ⚠️ Avoid importing FlashcardMatch into itself to prevent infinite recursion
// (you already defined it below)

export default function FlashcardMatch() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🃏 Flashcard Match</h2>
      <p>This tool is under development. Matching flashcards will be added here soon.</p>
    </div>
  );
}

// ✅ If you're exporting TOOL_COMPONENTS, do so below
export const TOOL_COMPONENTS = {
  DICTATION_SENTENCE: <DictationQuiz section="vocabulary" />,
  PREFIX_MATCH: <PrefixMatchingQuiz />,
  SPELLING_DICTATION: <SpellingDictation />,
  ROOT_EXPLORER: <RootExplorer />,
  GRAMMAR_FILL: <GrammarFillQuiz />,
  MISTAKE_REVIEW: <StudentMistakeReview />,
  FLASHCARD_MATCH: <FlashcardMatch />
};
