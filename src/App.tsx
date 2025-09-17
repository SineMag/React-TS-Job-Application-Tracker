import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import SignUpPage from "./components/SignUpPage";

function App() {
  return (
    <Router>
      <div className="landingPage">
        {/* landing page */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<h2>About Page</h2>} />
          <Route path="/contact" element={<h2>Contact Page</h2>} />
          
          <Route path="/signup" element={<SignUpPage/>} />
          <Route >
            {/* sign-up or sign-in page  */}

          </Route>
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
