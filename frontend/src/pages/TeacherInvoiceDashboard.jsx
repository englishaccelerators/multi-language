
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherInvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [className, setClassName] = useState('');

  const fetchInvoices = () => {
    const url = className ? `/api/class-invoices/?class_name=${className}` : '/api/class-invoices/';
    axios.get(url).then(res => setInvoices(res.data));
  };

  useEffect(() => {
    fetchInvoices();
  }, [className]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <input
        type="text"
        placeholder="Filter by class..."
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="border px-2 py-1 mb-4"
      />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Currency</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td className="p-2 border">{inv.class_name}</td>
              <td className="p-2 border">{inv.billing_month}</td>
              <td className="p-2 border">${inv.amount_due}</td>
              <td className="p-2 border">{inv.currency}</td>
              <td className="p-2 border">{inv.paid ? 'Paid' : 'Unpaid'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherInvoiceDashboard;
