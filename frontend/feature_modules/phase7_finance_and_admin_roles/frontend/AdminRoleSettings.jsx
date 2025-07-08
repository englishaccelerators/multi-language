// Role control UI
export default function AdminRoleSettings({ roles, onChange }) {
  return (
    <div>
      <h3>Admin Roles</h3>
      {roles.map(role => (
        <div key={role.name}>
          <strong>{role.name}</strong>: {role.permissions.join(', ')}
        </div>
      ))}
    </div>
  );
}