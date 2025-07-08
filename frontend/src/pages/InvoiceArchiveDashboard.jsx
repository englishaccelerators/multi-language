
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceArchiveDashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('/api/class-invoices/').then(res => setInvoices(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Invoice Archive</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Paid</th>
            <th className="p-2 border">Email Sent</th>
            <th className="p-2 border">Opened</th>
            <th className="p-2 border">PDF</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td className="p-2 border">{inv.class_name}</td>
              <td className="p-2 border">{inv.billing_month}</td>
              <td className="p-2 border">${inv.amount_due}</td>
              <td className="p-2 border">{inv.paid ? '✅' : '❌'}</td>
              <td className="p-2 border">{inv.email_sent ? '✅' : '❌'}</td>
              <td className="p-2 border">{inv.opened ? '✅' : '❌'}</td>
              <td className="p-2 border">
                <a
                  href={`/api/billing/download-invoice/${inv.id}/`}
                  target="_blank"
                  className="text-blue-600 underline"
                  rel="noreferrer"
                >
                  Download PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceArchiveDashboard;
