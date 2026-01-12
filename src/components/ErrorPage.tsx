import { Link } from "react-router-dom";
import ErrorClip from "/Error.mp4";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1 className="errorCode">404</h1>
        <p className="errorMessage">
          Sorry — the page you were looking for doesn't exist.
        </p>
        <p className="errorSub">
          It may have been moved or the URL is incorrect.
        </p>
        <Link to="/" className="backHome">
          ← Back to Home
        </Link>
        <video
          src={ErrorClip}
          autoPlay
          loop
          muted
          className="errorVideo"
          aria-label="Page not found animation"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
