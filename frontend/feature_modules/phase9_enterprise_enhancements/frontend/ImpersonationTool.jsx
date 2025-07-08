// UI for impersonating user session
export default function ImpersonationTool({ onImpersonate }) {
  return (
    <div>
      <input placeholder='Enter user ID' id='impersonate-id' />
      <button onClick={() => {
        const uid = document.getElementById('impersonate-id').value;
        onImpersonate(uid);
      }}>Impersonate</button>
    </div>
  );
}