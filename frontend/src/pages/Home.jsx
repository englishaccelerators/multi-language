import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        📚 Welcome to English Learning Hub
      </h1>
      <p className="mb-6 text-gray-700">
        Learn, practice, and master every part of the English language — from prefixes and pronunciation to advanced roots and vocabulary.
      </p>

      {/* 🔊 Ad Banner Top */}
      <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded text-sm text-center text-gray-600">
        📢 This platform is free for learners.
        <span className="italic text-xs text-gray-500 ml-1">[Sponsored ad or message]</span>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 text-center text-sm font-medium">
        <Link to="/dictionary" className="bg-white p-4 rounded shadow hover:bg-blue-50 border border-blue-200">📘 Dictionary</Link>
        <Link to="/prefixes" className="bg-white p-4 rounded shadow hover:bg-purple-50 border border-purple-200">🔠 Prefixes</Link>
        <Link to="/suffixes" className="bg-white p-4 rounded shadow hover:bg-pink-50 border border-pink-200">🔚 Suffixes</Link>
        <Link to="/root" className="bg-white p-4 rounded shadow hover:bg-green-50 border border-green-200">🌱 Roots</Link>
        <Link to="/vocabulary/beginning" className="bg-white p-4 rounded shadow hover:bg-green-50 border border-green-200">🌱 Beginner Vocabulary</Link>
        <Link to="/vocabulary/intermediate" className="bg-white p-4 rounded shadow hover:bg-yellow-50 border border-yellow-200">🧠 Intermediate Vocabulary</Link>
        <Link to="/vocabulary/advanced" className="bg-white p-4 rounded shadow hover:bg-red-50 border border-red-200">📕 Advanced Vocabulary</Link>
        <Link to="/pronunciation" className="bg-white p-4 rounded shadow hover:bg-indigo-50 border border-indigo-200">🎧 Pronunciation</Link>
        <Link to="/spelling" className="bg-white p-4 rounded shadow hover:bg-orange-50 border border-orange-200">✍️ Spelling</Link>
        <Link to="/rhythm" className="bg-white p-4 rounded shadow hover:bg-teal-50 border border-teal-200">🌀 Rhythm</Link>
        <Link to="/grammar" className="bg-white p-4 rounded shadow hover:bg-cyan-50 border border-cyan-200">📑 Grammar</Link>
        <Link to="/verbform" className="bg-white p-4 rounded shadow hover:bg-lime-50 border border-lime-200">🔤 Verb Form</Link>
      </div>

      {/* Final Exam Banner */}
      <div className="mt-10 p-5 bg-yellow-100 border-l-4 border-yellow-600 rounded">
        <p className="mb-3 text-lg font-semibold text-yellow-800">
          🎓 Ready to test your mastery?
        </p>
        <p className="text-sm text-gray-700 mb-3">
          Take the comprehensive final exam and test your understanding across all sections.
        </p>
        <Link
          to="/final-exam"
          className="inline-block px-5 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          🧪 Start Final Exam
        </Link>
      </div>

      {/* Bottom Ad Banner */}
      <div className="mt-10 p-4 bg-gray-100 border border-gray-300 rounded text-center text-sm text-gray-600">
        💡 Support our learning mission by checking out our partners.
        <br />
        <span className="italic text-xs text-gray-500">[Ad space or logo]</span>
      </div>
    </div>
  );
}
