
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../auth/axiosWithAuth';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/auth/password-reset-confirm/${uid}/${token}/`, {
        new_password: newPassword
      });
      setStatus('Password has been reset successfully.');
    } catch (error) {
      setStatus('Reset failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Set New Password</h2>
      <form onSubmit={handleReset}>
        <input
          className="border p-2 w-full mb-2"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New password"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Reset Password
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
