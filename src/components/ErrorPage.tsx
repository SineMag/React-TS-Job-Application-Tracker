import ErrorClip from '/Error.mp4';

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
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
        <div className="errorActions">
          <button 
            className="homeButton" 
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
