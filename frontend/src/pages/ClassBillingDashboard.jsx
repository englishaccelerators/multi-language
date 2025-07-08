
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassBillingDashboard = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('/api/class-billing/').then(res => setPlans(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Class Billing Plans</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Currency</th>
            <th className="p-2 border">Active</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td className="p-2 border">{plan.class_name}</td>
              <td className="p-2 border">{plan.plan_name}</td>
              <td className="p-2 border">${plan.price_per_month}</td>
              <td className="p-2 border">{plan.currency}</td>
              <td className="p-2 border">{plan.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassBillingDashboard;
