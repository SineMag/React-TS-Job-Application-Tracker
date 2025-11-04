import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/Error404.css"; // Ensure you have styles for the snackbar

export default function Error404() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    // Show the snackbar when the page loads
    setShowSnackbar(true);

    // Hide it after 3 seconds
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1>404</h1>
        <p className="errorMessage">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <video
          src="../../public/Error.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="errorVideo"
        />

        <Link to="/" className="backHome">
          ⬅ Back to Home
        </Link>
      </div>

      {/* Snackbar */}
      {showSnackbar && (
        <div className="snackbar">
          Page not found! Redirecting to home is suggested.
        </div>
      )}
    </div>
  );
}
