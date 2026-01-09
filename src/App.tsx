import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;