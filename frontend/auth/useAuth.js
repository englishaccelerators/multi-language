// ✅ src/auth/useAuth.js
import axios from '../auth/axiosWithAuth';

const API_URL = 'http://localhost:8000/auth';

// 🔐 Login
export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_URL}/login/`, { username, password });
  localStorage.setItem('access', res.data.access);
  localStorage.setItem('refresh', res.data.refresh);
  return res.data;
};

// 🧾 Register
export const registerUser = async (username, password, role = 'student') => {
  return await axios.post(`${API_URL}/register/`, { username, password, role });
};

// 👤 Get Current Logged In User
export const getCurrentUser = async () => {
  const token = localStorage.getItem('access');
  const res = await axios.get(`${API_URL}/me/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 🚪 Logout
export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  window.location.href = '/login'; // Redirect after logout
};
