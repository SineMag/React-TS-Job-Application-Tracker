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
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>JobTrack</h2>
        </Link>
      </div>
      <div className="rightNav">
        {showLogout && (
          <ul className="headerNavList">
            <li>
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
