// 📍 File: frontend/src/pages/admin/MassProductionDashboard.jsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MassProductionDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Mass Production Tool</h1>
      <p className="text-muted-foreground">Upload Excel or CSV files and import content into the platform's dictionary blocks.</p>

      <Card>
        <CardContent className="space-y-4 p-4">
          <input type="file" accept=".xlsx, .csv" className="border p-2 w-full" />
          <Button>🚀 Import to Database</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">✅ Import Rules:</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Column A = Word</li>
            <li>Column B = Part of Speech (v, n, adj...)</li>
            <li>Column C = Definition</li>
            <li>Column D-H = Examples (1–5)</li>
            <li>Column I = Audio Identifier (optional)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
