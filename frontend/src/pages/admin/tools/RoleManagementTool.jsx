// 📍 File: frontend/src/pages/admin/RoleManagementTool.jsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RoleManagementTool() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [role, setRole] = useState('DataEntryAdmin');

  const addUser = () => {
    if (!newUser) return;
    setUsers([...users, { name: newUser, role }]);
    setNewUser('');
    setRole('DataEntryAdmin');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">👥 Role Management Tool</h1>
      <p className="text-muted-foreground">Assign admin types and permissions for your multilingual teams.</p>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input placeholder="User Email or Username" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
          <select className="w-full border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>DataEntryAdmin</option>
            <option>AudioAdmin</option>
            <option>QAAdmin</option>
            <option>FrontendAdmin</option>
            <option>LogicAdmin</option>
            <option>AnalyticsAdmin</option>
            <option>BillingAdmin</option>
            <option>LocalizationAdmin</option>
            <option>MarketingAdmin</option>
          </select>
          <Button onClick={addUser}>➕ Add Admin</Button>
        </CardContent>
      </Card>

      {users.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">✅ Current Admins</h2>
            {users.map((u, i) => (
              <div key={i} className="text-sm font-mono">
                {u.name} — <strong>{u.role}</strong>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
