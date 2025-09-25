import { Link } from "react-router-dom";
import { logOut } from "../services/api";

interface HeaderProps {
  showLogout?: boolean;
}

export default function Header({ showLogout = false }: HeaderProps) {

  const handleLogout = async () => {
    try {
      await logOut();
      // Force a page reload to update the auth context
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>Job Application Tracker</h2>
        </Link>
      </div>
      <div className="rightNav">
        <ul style={{ listStyleType: "none" }}>
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
