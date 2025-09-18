import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1>404</h1>
        <p className="errorMessage">Oops! The page you’re looking for doesn’t exist.</p>

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
    </div>
  );
}
