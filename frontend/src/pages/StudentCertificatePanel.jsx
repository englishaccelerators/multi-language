
import React, { useState } from 'react';

const StudentCertificatePanel = ({ username }) => {
  const [status, setStatus] = useState('');

  const downloadCertificate = () => {
    setStatus('Preparing...');
    window.open(`/api/certificate/download/?username=${username}`, '_blank');
    setStatus('Download started.');
  };

  const requestEmail = () => {
    fetch(`/api/certificate/email/?username=${username}`).then(() =>
      setStatus('Certificate email sent.')
    );
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">🎓 Grammar Certificate</h2>
      <button onClick={downloadCertificate} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">Download</button>
      <button onClick={requestEmail} className="bg-green-600 text-white px-3 py-1 rounded">Email Me</button>
      {status && <div className="mt-2 text-sm text-gray-600">{status}</div>}
    </div>
  );
};

export default StudentCertificatePanel;
