import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:3000/users";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      try {
        const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const data = await res.json();

        if (data.length > 0) {
          localStorage.setItem("currentUser", JSON.stringify(data[0]));
          console.log("Logged-in user:", data[0]); // ✅ log the user
          setMessage(`✅ Welcome back, ${data[0].name}!`);
          navigate("/dashboard"); // redirect to dashboard
        } else {
          setMessage("❌ Invalid email or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setMessage("⚠️ Login failed. Try again later.");
      }
    } else {
      // SIGNUP
      try {
        const checkRes = await fetch(`${API_URL}?email=${email}`);
        const existingUsers = await checkRes.json();

        if (existingUsers.length > 0) {
          setMessage("❌ Email already registered. Please login.");
        } else {
          const newUser = { name: "User", email, password };
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });

          if (res.ok) {
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            console.log("user:", newUser);
            setMessage("✅ Account created! Logging in...");
            setIsLogin(true);
            // auto login and redirect
            navigate("/dashboard"); 
          } else {
            setMessage("⚠️ Failed to sign up. Try again.");
          }
        }
      } catch (err) {
        console.error("Signup error:", err);
        setMessage("⚠️ Signup failed. Try again later.");
      }
    }

    // Reset form
    setEmail("");
    setPassword("");
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

        {message && <p className="statusMessage">{message}</p>}

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

          <button type="submit" className="logButton">
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
