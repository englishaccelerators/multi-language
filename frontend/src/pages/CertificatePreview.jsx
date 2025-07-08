import React from 'react';
import jsPDF from 'jspdf';

export default function CertificatePreview({ student, section, groupCode, score, date, show, onClose }) {
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Mastery", 70, 30);
    doc.setFontSize(14);
    doc.text(`Awarded to: ${student}`, 20, 50);
    doc.text(`Section: ${section}`, 20, 60);
    doc.text(`Group Code: ${groupCode}`, 20, 70);
    doc.text(`Score: ${score}%`, 20, 80);
    doc.text(`Date: ${new Date(date).toLocaleDateString()}`, 20, 90);
    doc.save(`${section}_${groupCode}_certificate.pdf`);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-lg font-bold mb-4 text-green-700">🎓 Certificate Preview</h2>
        <p className="mb-2">This certifies that <strong>{student}</strong> has successfully completed:</p>
        <ul className="text-sm text-gray-700 mb-4">
          <li>📘 Section: <strong>{section}</strong></li>
          <li>🔤 Group Code: <strong>{groupCode}</strong></li>
          <li>✅ Score: <strong>{score}%</strong></li>
          <li>🗓 Date: {new Date(date).toLocaleDateString()}</li>
        </ul>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Close</button>
          <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded">Download PDF</button>
        </div>
      </div>
    </div>
  );
}
