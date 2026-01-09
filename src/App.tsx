import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import JobDetails from "./pages/JobDetails";
import Snackbar from "./components/Snackbar";

function AppContent() {
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const isDashboard = location.pathname === "/dashboard";

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <div className="appContainer">
      {location.pathname !== "/" && (
        <Header showLogout={!!currentUser && isDashboard} />
      )}
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/about"
            element={
              <div className="page aboutPage">
                <h2>About Job Application Tracker</h2>
                <div className="aboutContent">
                  <section>
                    <h3>What is Job Application Tracker?</h3>
                    <p>
                      Job Application Tracker is a modern, user-friendly
                      application designed to help you manage and organize your
                      job search journey. Whether you're actively job hunting or
                      casually browsing opportunities, our tracker helps you
                      stay organized and focused.
                    </p>
                  </section>
                  <section>
                    <h3>Key Features</h3>
                    <ul>
                      <li>
                        <strong>Easy Tracking:</strong> Keep all your job
                        applications in one place with detailed information
                      </li>
                      <li>
                        <strong>Status Management:</strong> Track the status of
                        each application (Applied, Pending, Interview, Offer,
                        Rejected)
                      </li>
                      <li>
                        <strong>Notes & Details:</strong> Add important notes
                        about each position, company insights, and interview
                        details
                      </li>
                      <li>
                        <strong>Responsive Design:</strong> Access your
                        applications on any device, anywhere, anytime
                      </li>
                      <li>
                        <strong>Search & Filter:</strong> Quickly find specific
                        applications by company or position
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h3>Why Use Job Application Tracker?</h3>
                    <p>
                      Keeping track of job applications can be overwhelming. Our
                      tracker simplifies the process by providing a centralized
                      platform where you can:
                    </p>
                    <ul>
                      <li>Maintain a complete history of your job search</li>
                      <li>Follow up at the right time</li>
                      <li>
                        Prepare better for interviews by reviewing company notes
                      </li>
                      <li>
                        Analyze your job search patterns and success rates
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
      <Snackbar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
