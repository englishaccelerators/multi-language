
import React, { useState } from 'react';
import axios from 'axios';

const TeacherReportCardTool = () => {
  const [studentName, setStudentName] = useState('');
  const [summary, setSummary] = useState({
    Vocabulary: 'Complete',
    Grammar: 'Intermediate',
    Spelling: 'Strong',
    XP: '2450',
    Streak: '15 days'
  });

  const generateReport = () => {
    const url = `/api/student-report/download?student_name=${encodeURIComponent(studentName)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Generate Student Report Card</h2>
      <input
        type="text"
        placeholder="Student Full Name"
        className="border px-3 py-2 mb-4 w-full rounded"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button
        onClick={generateReport}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default TeacherReportCardTool;
