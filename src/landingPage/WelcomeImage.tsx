import React from "react";
import WelcomeImage from "../assets/image 19.png";

export default function Welcome() {
  return (
    <div className="welcomePage">
      <div className="left">
        <h1>Job Application Tracker</h1> <br />
        <h2>Welcome</h2>
        <h3>Track your applications, measure your progress — and stay ahead in your job search.</h3>
        <p>Please <button>Login</button> or <button>Register</button></p>
      </div>
            <img src={WelcomeImage} alt="Hero Landing image on the right side" />

    </div>
  );
}
