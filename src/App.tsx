import { useState } from "react";
import "./App.css";
import WelcomeImage from "./components/WelcomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        {/* the landing page section  */}
        <div className="landingPage">
          <div>
            <WelcomeImage />
          </div>
          <div className="footerLandingPage">
            <Footer>
              &copy; ReactTS Job Application Tracker | Sinenhlanhla Magubane
            </Footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
