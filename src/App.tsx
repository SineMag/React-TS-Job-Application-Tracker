import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUpPage from "./components/SignUpPage";
import LogInPage from "./components/LogInPage";
import Dashboard from "./components/Dashboard";

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
