// ✅ VocabularyBeginner.jsx — Updated
import React from 'react';
import StudentToolLoader from './StudentToolLoader';

export default function VocabularyBeginner() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📗 Beginner Vocabulary</h2>

      {/* Optional: Your custom word list display here */}

      {/* ✅ Interactive Learning Tools */}
      <StudentToolLoader section="vocabulary" />
    </div>
  );
}
