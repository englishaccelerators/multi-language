
import React from 'react';

const LiveClassroom = ({ students }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-2">Live Classroom</h2>
    <ul className="list-disc pl-6">
      {students.map((student, idx) => (
        <li key={idx} className="text-green-700">{student.name} is online</li>
      ))}
    </ul>
  </div>
);

export default LiveClassroom;
