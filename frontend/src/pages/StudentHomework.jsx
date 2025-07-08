import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';

import { Link } from 'react-router-dom';

export default function StudentHomework({ token }) {
  const [homework, setHomework] = useState([]);

  useEffect(() => {
    async function fetchHomework() {
      try {
        const res = await axios.get('http://localhost:8000/api/student/homework/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHomework(res.data);
      } catch (err) {
        console.error('Failed to load student homework:', err);
      }
    }
    fetchHomework();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Your Assigned Homework</h2>

      {homework.length === 0 ? (
        <p className="text-gray-600">No homework assigned yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Due</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {homework.map((hw, idx) => (
              <tr key={idx}>
                <td className="p-2 border capitalize">{hw.section}</td>
                <td className="p-2 border">{hw.group_code}</td>
                <td className="p-2 border">{hw.due_date}</td>
                <td className="p-2 border">
                  <Link
                    to={`/${hw.section}/${hw.group_code}`}
                    className="text-blue-600 underline"
                  >
                    Start
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
