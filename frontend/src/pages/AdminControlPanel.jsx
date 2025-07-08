
import React from 'react';
import { Link } from 'react-router-dom';

const AdminControlPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Command Center 🛠️</h1>
      <ul className="space-y-3 text-lg">
        <li><Link to="/LaunchAnalytics" className="text-blue-600 underline">📊 View Analytics</Link></li>
        <li><Link to="/TeacherReportCardTool" className="text-blue-600 underline">📄 Generate Student Reports</Link></li>
        <li><Link to="/ClassBillingDashboard" className="text-blue-600 underline">💳 Manage Class Billing</Link></li>
        <li><Link to="/FeatureToggles" className="text-blue-600 underline">⚙️ Toggle Features</Link></li>
        <li><Link to="/InvoiceArchiveDashboard" className="text-blue-600 underline">📂 Invoice Archive</Link></li>
      </ul>
    </div>
  );
};

export default AdminControlPanel;
