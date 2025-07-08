// Finance tab UI
export default function FinanceDashboard({ income, refunds }) {
  return (
    <div>
      <h2>Finance Overview</h2>
      <p>Total Income: ${income}</p>
      <p>Refunds Issued: ${refunds}</p>
      <button>Export CSV</button>
    </div>
  );
}