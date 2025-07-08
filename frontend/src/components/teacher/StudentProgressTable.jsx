
import React from 'react';

const StudentProgressTable = ({ progress }) => (
  <div>
    <h2 className="text-lg font-bold mb-2">Student Progress</h2>
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2 py-1">Student</th>
          <th className="border px-2 py-1">Word</th>
          <th className="border px-2 py-1">Correct</th>
          <th className="border px-2 py-1">Time</th>
        </tr>
      </thead>
      <tbody>
        {progress.map((entry, idx) => (
          <tr key={idx}>
            <td className="border px-2 py-1">{entry.student}</td>
            <td className="border px-2 py-1">{entry.identifiercode}</td>
            <td className="border px-2 py-1">{entry.correct ? 'Yes' : 'No'}</td>
            <td className="border px-2 py-1">{entry.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StudentProgressTable;
