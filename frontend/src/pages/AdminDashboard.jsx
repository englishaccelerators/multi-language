
import React, { useState } from 'react';
import AdminAIControl from '../components/admin/AdminAIControl';

const AdminDashboard = () => {
  const [view, setView] = useState('ai');

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <button onClick={() => setView('ai')} className="block mb-2">AI Tool Control</button>
          <button onClick={() => setView('analytics')} className="block mb-2">Analytics</button>
          <button onClick={() => setView('export')} className="block mb-2">Export CSV</button>
          <button onClick={() => setView('words')} className="block mb-2">Word Manager</button>
          <button onClick={() => setView('roles')} className="block mb-2">User Roles</button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        {view === 'ai' && <AdminAIControl />}
        {/* Placeholder: analytics, export, words, roles */}
      </main>
    </div>
  );
};

export default AdminDashboard;
