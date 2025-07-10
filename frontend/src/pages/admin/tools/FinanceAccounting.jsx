// 📍 File: frontend/src/pages/admin/FinanceAccounting.jsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FinanceAccounting() {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({ name: '', price: '' });

  const handleAddPlan = () => {
    if (!plan.name || !plan.price) return;
    setPlans([...plans, plan]);
    setPlan({ name: '', price: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">💸 Finance & Accounting</h1>
      <p className="text-muted-foreground">Manage pricing plans, license types, and invoicing setup.</p>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input placeholder="Plan name (e.g., School Basic)" value={plan.name} onChange={(e) => setPlan({ ...plan, name: e.target.value })} />
          <Input placeholder="Price per month" value={plan.price} onChange={(e) => setPlan({ ...plan, price: e.target.value })} />
          <Button onClick={handleAddPlan}>➕ Add Plan</Button>
        </CardContent>
      </Card>

      {plans.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">📦 Plans</h2>
            {plans.map((p, i) => (
              <div key={i} className="text-sm font-mono">{p.name} — ${p.price}/month</div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
