import { Link } from "react-router-dom";
import "../components/Error404.css"; // Ensure you have styles for the snackbar

export default function Error404() {
  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1>404</h1>
        <p className="errorMessage">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="errorMessage">
          Please check the URL or return to the homepage.
        </p>

        <Link to="/" className="backHome">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
