// Toggle control UI
export default function AdminTogglePanel({ toggles, onToggle }) {
  return (
    <div>
      <h3>Admin Feature Toggles</h3>
      {Object.entries(toggles).map(([key, enabled]) => (
        <div key={key}>
          <label>{key}</label>
          <input type='checkbox' checked={enabled} onChange={() => onToggle(key)} />
        </div>
      ))}
    </div>
  );
}