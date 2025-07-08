
import React from 'react';

const ClassroomList = ({ classrooms }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold mb-2">My Classrooms</h2>
    <ul className="list-disc pl-6">
      {classrooms.map((room, idx) => (
        <li key={idx}>{room.name}</li>
      ))}
    </ul>
  </div>
);

export default ClassroomList;
