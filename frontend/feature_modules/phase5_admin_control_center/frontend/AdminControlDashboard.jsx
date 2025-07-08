// Full Admin UI
import AdminTogglePanel from './AdminTogglePanel';
export default function AdminControlDashboard() {
  const [toggles, setToggles] = React.useState({
    enable_ai_tutor: true,
    enable_weekly_missions: false,
    enable_coupon_codes: true
  });
  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AdminTogglePanel toggles={toggles} onToggle={toggle} />
    </div>
  );
}