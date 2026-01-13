import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="page">
      <h2>Contact Us</h2>
      <p>
        Have questions, feedback, or suggestions about Job Application Tracker?
        You can reach out using the details below.
      </p>
      <ul>
        <li>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></li>
        <li>GitHub: <a href="https://github.com/SineMag" target="_blank" rel="noreferrer">@SineMag</a></li>
      </ul>
      <p>
        Prefer to continue exploring? Go back to the <Link to="/">home page</Link> or
        head to your <Link to="/dashboard">dashboard</Link>.
      </p>
    </div>
  );
}
