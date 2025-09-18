import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:3000/users"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // login
      try {
        const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const data = await res.json();

        if (data.length > 0) {
          setMessage(`✅ Welcome back, ${data[0].name}!`);
          console.log("Login success:", data[0]);
        } else {
          setMessage("❌ Invalid email or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setMessage("⚠️ Login failed. Try again later.");
      }
    } else {
      try {
        const newUser = { name, email, password };
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (res.ok) {
          setMessage("✅ Account created successfully! Please login.");
          console.log("User signed up:", newUser);
          setIsLogin(true); // switch to login after signup
        } else {
          setMessage("⚠️ Failed to sign up. Try again.");
        }
      } catch (err) {
        console.error("Signup error:", err);
        setMessage("⚠️ Signup failed. Try again later.");
      }
    }

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
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

        {message && <p className="statusMessage">{message}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="formGroup">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

          <button type="submit" className="authButton">
            {isLogin ? "Login" : "Sign Up"}
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
