// 📍 File: frontend/src/pages/admin/CEODashboard.jsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CEODashboard() {
  const stats = [
    { label: 'Languages Launched', value: 28 },
    { label: 'Sites Built', value: 123 },
    { label: 'Total Admins', value: 54 },
    { label: 'Audio Files Synced', value: 9842 },
    { label: 'Live Deployments', value: 42 },
    { label: 'Monthly Visitors', value: '1.2M' },
    { label: 'Generated Quizzes', value: 2173 },
    { label: 'AI Suggestions Used', value: 3792 }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 CEO Dashboard</h1>
      <p className="text-muted-foreground">System-wide performance and status monitoring.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
