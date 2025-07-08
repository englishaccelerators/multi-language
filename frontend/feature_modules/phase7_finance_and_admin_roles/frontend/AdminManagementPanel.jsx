
// Admin Management Panel UI with Role Cascade Logic
export default function AdminManagementPanel({ admins, currentAdmin, onAssign }) {
  const canManage = (target) =>
    currentAdmin.role === 'owner' || target.assignedBy === currentAdmin.name;

  return (
    <div>
      <h3>Admin Management Panel</h3>
      <ul>
        {admins.map((admin, idx) => (
          <li key={idx}>
            <strong>{admin.name}</strong> – {admin.role.toUpperCase()}<br />
            Permissions: {admin.permissions.join(', ')}<br />
            Assigned By: {admin.assignedBy}
            {canManage(admin) && <button onClick={() => onAssign(admin)}>Edit</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
