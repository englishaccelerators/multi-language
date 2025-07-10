// 📍 File: frontend/src/pages/admin/AdManagerDashboard.jsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdManagerDashboard() {
  const [ads, setAds] = useState([]);
  const [message, setMessage] = useState('');

  const handleAddAd = () => {
    if (!message) return;
    setAds([...ads, message]);
    setMessage('');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📢 Ad Manager</h1>
      <p className="text-muted-foreground">Add promotional messages or sponsor banners per site or section.</p>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input placeholder="Add CTA or ad message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={handleAddAd}>➕ Save Message</Button>
        </CardContent>
      </Card>

      {ads.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">🗣️ Active Messages</h2>
            {ads.map((ad, i) => (
              <div key={i} className="text-sm font-mono">{ad}</div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
