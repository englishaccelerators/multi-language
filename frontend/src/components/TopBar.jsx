// import { useAuthContext } from '@/auth/AuthContext';
// import { logoutUser } from '@/auth/useAuth';

export default function TopBar() {
  // const { user } = useAuthContext();

  return (
    <div style={{
      background: '#222',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>📘 English Dictionary</h3>

      <div>
        {/* ✅ Test Link for Vercel to Find DataEntry Page */}
        <a href="/admin/tools/data-entry" style={{ color: 'yellow', marginRight: '20px' }}>
          🔧 Data Entry
        </a>
      </div>

      {/* Optional auth logic can be re-enabled later */}
      {/* 
      {user ? (
        <div>
          Welcome, <strong>{user.username}</strong> ({user.role}){' '}
          <a href={`/${user.role}/dashboard`} style={{ color: '#0cf', marginRight: '10px' }}>
            Dashboard
          </a>
          <button
            style={{ padding: '4px 10px', background: '#444', color: 'white', border: 'none' }}
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <a href="/login" style={{ color: '#ccc', marginRight: '10px' }}>Login</a>
          <a href="/register" style={{ color: '#ccc' }}>Register</a>
        </div>
      )} 
      */}
    </div>
  );
}
