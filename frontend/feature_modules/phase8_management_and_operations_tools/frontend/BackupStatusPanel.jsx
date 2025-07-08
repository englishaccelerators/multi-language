// Backup monitor UI
export default function BackupStatusPanel({ backups }) {
  return (
    <div>
      <h3>Backup History</h3>
      <ul>{backups.map((b, i) => <li key={i}>{b.date} – {b.status}</li>)}</ul>
    </div>
  );
}