// ✅ Grammar.jsx
import React from 'react';

export default function Grammar() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📑 Grammar Lessons</h1>
      <p className="text-gray-700 mb-6">
        This section will include detailed grammar rules, examples, and quizzes powered by your dictionary database.
      </p>
      <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 mb-6">
        📢 Practice quizzes and exercises will appear here once assigned by the admin.
      </div>
      <div className="p-4 text-center bg-gray-50 text-sm text-gray-500 border border-dashed">
        📢 This is a free preview section. Upgrade for full grammar access.
      </div>
    </div>
  );
}
