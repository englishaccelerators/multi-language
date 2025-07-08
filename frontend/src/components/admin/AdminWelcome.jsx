
import React from 'react';

const AdminWelcome = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
    <p className="mb-4">
      This panel allows full control over the English Dictionary platform.
      All features — including AI tools, quizzes, analytics, and word entries — are configurable here.
    </p>
    <ul className="list-disc ml-6">
      <li>Toggle AI features like AskGPT, Whisper, and Sentence Generator</li>
      <li>Export user analytics to CSV</li>
      <li>Edit dictionary entries (words and examples)</li>
      <li>Manage user access roles (admin, editor, viewer)</li>
      <li>Control which features are public or restricted</li>
      <li>Monitor system usage and plan future upgrades</li>
    </ul>
    <p className="mt-4 font-medium">
      This system is powered by a structured identifiercode model that enables scalable linguistic processing, personalized learning, and fast database querying.
    </p>
  </div>
);

export default AdminWelcome;
