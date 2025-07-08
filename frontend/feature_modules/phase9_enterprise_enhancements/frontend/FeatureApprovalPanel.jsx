// UI for Admin Preview Mode
export default function FeatureApprovalPanel({ features, onApprove }) {
  return (
    <div>
      <h3>Feature Preview Approvals</h3>
      <ul>{features.map((f, i) => (
        <li key={i}>{f.name} – Preview: {f.preview ? 'ON' : 'OFF'} – Approved: {f.approved ? '✅' : '❌'}
          {!f.approved && <button onClick={() => onApprove(f.name)}>Approve</button>}
        </li>
      ))}</ul>
    </div>
  );
}