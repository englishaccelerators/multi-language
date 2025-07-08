
import axios from 'axios';

const axiosWithAuth = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return instance;
};

export default axiosWithAuth;
