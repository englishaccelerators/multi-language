import { useState } from 'react';
// import { loginUser } from './useAuth'; // 👈 Uncomment if needed

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Simulated login response
    // Replace this with: const res = await loginUser(form.username, form.password);
    const res = {
      username: form.username,
      role: form.username === 'admin'
        ? 'admin'
        : form.username === 'teacher'
        ? 'teacher'
        : 'student'
    };

    alert("Logged in as " + res.username);

    // ✅ Redirection logic
    if (res.role === 'admin') {
      window.location.href = '/admin/dashboard';
    } else if (res.role === 'teacher') {
      window.location.href = '/teacher/dashboard';
    } else {
      window.location.href = '/student/dashboard';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
