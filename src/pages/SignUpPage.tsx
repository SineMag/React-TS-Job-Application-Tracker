import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const { showNotification } = useNotification();
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
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
      setFullName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="signUpPage">
      {/* Top Nav with back arrow */}
      <div className="signUpNav">
        <button className="leftArrow" onClick={() => navigate("/")}>
          <FiArrowLeftCircle size={28} />
        </button>
      </div>

      {/* Form */}
      <div className="signUpForm">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="formGroup">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="authButton" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggleText">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
