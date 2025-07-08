// KPI Summary UI
export default function KPIDashboard({ data }) {
  return (
    <div>
      <h2>Business KPI Dashboard</h2>
      <p>Daily Signups: {data.daily_signups}</p>
      <p>Active Users: {data.active_users}</p>
      <p>Churn Rate: {data.churn_rate * 100}%</p>
      <p>Total Revenue: ${data.total_revenue}</p>
    </div>
  );
}