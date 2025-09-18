import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging in:", { email, password });
      // TODO: Hook up login API
    } else {
      console.log("Signing up:", { email, password });
      // TODO: Hook up signup API
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="authPage">
      {/* Top Nav with back arrow */}
      <div className="authNav">
        <button
          type="button"
          className="leftArrow"
          onClick={() => navigate("../pages/SignUpPage.tsx")}
          aria-label="Go to signup-page"
        >
          <FiArrowLeftCircle size={28} />
        </button>
      </div>

      {/* Auth Form */}
      <div className="authForm">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="authButton">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggleText">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="toggleLink"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
