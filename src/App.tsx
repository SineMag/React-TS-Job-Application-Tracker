import "./App.css";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUpPage from "./components/SignUpPage";
import LogInPage from "./components/LogInPage";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import Snackbar from "./components/Snackbar";

function AppContent() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isDashboard = location.pathname === '/dashboard';
  
  return (
    <div className="appContainer">
      {location.pathname !== '/' && <Header showLogout={!!currentUser && isDashboard} />}
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<div className="page"><h2>About Page</h2><p>Learn more about our Job Application Tracker system.</p></div>} />
          <Route path="/contact" element={<div className="page"><h2>Contact Page</h2><p>Get in touch with us for support.</p></div>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LogInPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </main>
      <Footer />
      <Snackbar />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./components/AuthContext";
import JobDetails from "./pages/JobDetails"
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="landingPage">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-details" element={<JobDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
>>>>>>> 7fca742ce54faa43bf5f46c538852efbc5fd9324
    </AuthProvider>
  );
}

export default App;