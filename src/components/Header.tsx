import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  showLogout?: boolean;
}

export default function Header({ showLogout = false }: HeaderProps) {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>JobTrack</h2>
        </Link>
      </div>
      <div className="rightNav">
        <ul style={{ listStyleType: "none", display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {showLogout ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
