import React, { useEffect, useState } from 'react';
import axios from '@/auth/axiosWithAuth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function CertificateEarned({ token }) {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await axios.get('http://localhost:8000/api/student/certificates/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCerts(res.data);
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      }
    }
    fetchCertificates();
  }, [token]);

  const handleDownload = (cert) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Mastery", 70, 30);
    doc.setFontSize(14);
    doc.text(`Awarded to: ${cert.student}`, 20, 50);
    doc.text(`Section: ${cert.section}`, 20, 60);
    doc.text(`Group Code: ${cert.group_code}`, 20, 70);
    doc.text(`Score: ${cert.score}%`, 20, 80);
    doc.text(`Date: ${new Date(cert.date_awarded).toLocaleDateString()}`, 20, 90);
    doc.save(`${cert.section}_${cert.group_code}_certificate.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🎖 Earned Certificates</h2>
      {certs.length === 0 ? (
        <p className="text-gray-600">No certificates earned yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Download</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((cert, i) => (
              <tr key={i}>
                <td className="p-2 border font-bold">{cert.section}</td>
                <td className="p-2 border">{cert.group_code}</td>
                <td className="p-2 border text-green-800">{cert.score}%</td>
                <td className="p-2 border">{new Date(cert.date_awarded).toLocaleDateString()}</td>
                <td className="p-2 border">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDownload(cert)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
