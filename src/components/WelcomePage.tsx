import React from "react";
import WelcomeImage from "../assets/landing.png";

export default function Welcome() {
  return (
    <div className="welcomePage">
      {/* navigation section for the landing page */}
      <nav>
        <div className="logo">
          <h2>Job Application Tracker</h2>
        </div>
        <div className="rightNav">
          <ul style={{ listStyleType: "none" }}>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </nav>

      {/* hero section.. */}
      <div className="hero">
        <div className="heroText">
          <section
      style={{
        padding: "60px",
        background: "#f9f9f9",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "20px",
          
        }}
      >
        Welcome
      </h1>

      <p
        style={{
          fontSize: "1.4rem",
         
          maxWidth: "700px",
          margin: "0 auto 20px",
        }}
      >
        Track your applications, measure your progress, and stay ahead in your
        job search.
      </p>

      <p
        style={{
          fontSize: "1.1rem",
         
          maxWidth: "700px",
          margin: "0 auto 15px",
        }}
      >
        Stay organized with all your job applications in one place. See where
        you’ve applied, what’s pending, and what’s next.
      </p>

      <p
        style={{
          fontSize: "1.1rem",
          
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        Take control of your career journey with a simple, clear, and effective
        tracking tool.
      </p>
    </section>

        
          <button className="getStartedButton">Get Started</button>
        </div>

        <div className="heroImage">
          <img src={WelcomeImage} alt="Lime & Black Hero Image" />
        </div>
      </div>

      {/* ..close div */}
    </div>
  );
}

{
  /* <h2>Welcome</h2>
       
        <p>
          Please <button className="welcomeButton">Login</button> or <button>Register</button>
        </p>
              <img src={WelcomeImage} alt="Hero Landing image on the right side" /> */
}
