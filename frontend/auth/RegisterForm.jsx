import { useState } from 'react';
// import { registerUser } from './useAuth';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
//     const res = await registerUser(form.username, form.password, form.role);
    alert("Registered: " + JSON.stringify(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
