import { useState } from 'react';
// import { loginUser } from './useAuth';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
//     const res = await loginUser(form.username, form.password);
    alert("Logged in as " + res.username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}

// const res = await loginUser(form.username, form.password);
if (res.role === 'admin') {
  window.location.href = '/admin/dashboard';
} else if (res.role === 'teacher') {
  window.location.href = '/teacher/dashboard';
} else {
  window.location.href = '/student/dashboard';
}
