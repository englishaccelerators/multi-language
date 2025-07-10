// 📍 File: frontend/src/pages/admin/PerformanceTools.jsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function PerformanceTools() {
  const stats = [
    { label: 'Daily Quiz Submissions', value: 472 },
    { label: 'Live Dictionary Sessions', value: 124 },
    { label: 'Most Active Language', value: 'Arabic' },
    { label: 'Top Section Today', value: 'Grade 2 - Animals' },
    { label: 'Avg. Audio Plays per User', value: 5.8 },
    { label: 'Uptime (last 7 days)', value: '99.98%' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📈 Performance Monitor</h1>
      <p className="text-muted-foreground">Live activity stats for admins, QA, and scaling decisions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{s.label}</h2>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
