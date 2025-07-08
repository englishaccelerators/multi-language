// School dashboard UI
export default function SchoolDashboard({ school, students }) {
  return <div><h3>{school} Dashboard</h3><ul>{students.map(s => <li key={s}>{s}</li>)}</ul></div>;
}