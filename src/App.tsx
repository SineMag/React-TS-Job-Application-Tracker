import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <div className="landingPage">
        {/* landing page */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
