
import React, { useState } from 'react';
import axios from '../auth/axiosWithAuth';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/password-reset/', {
        email,
        frontend_url: window.location.origin
      });
      setStatus('Password reset email sent.');
    } catch (error) {
      setStatus('Error: ' + (error.response?.data?.error || 'Request failed'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Reset Link
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
};

export default PasswordResetRequest;
