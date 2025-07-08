
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CertificateVerifyPage = () => {
  const { username } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get(`/api/certificate/verify/${username}`).then(res => {
      if (res.data.valid) {
        setStatus(`✅ Certificate verified for ${username} - Issued on ${res.data.issued}`);
      } else {
        setStatus('❌ Certificate not found or expired.');
      }
    }).catch(() => setStatus('❌ Verification failed.'));
  }, [username]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">🔍 Certificate Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default CertificateVerifyPage;
