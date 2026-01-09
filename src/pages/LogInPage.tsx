import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

export default function LogInPage() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const { showNotification } = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        showNotification("Successfully logged in!", "success");
        navigate("/dashboard");
      } else {
        await signUp(email, password);
        showNotification("Account created successfully!", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Authentication failed";
      showNotification(errorMsg, "error");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="authPage">
      {/* Top Nav */}
      <div className="authNav">
        <button
          type="button"
          className="leftArrow"
          onClick={() => navigate(-1)}
          aria-label="Go back"
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

          <button type="submit" className="logButton" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
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
