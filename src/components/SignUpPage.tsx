import { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../firebase/auth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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
          {error && <div className="errorMessage">{error}</div>}
          
          {!isLogin && (
            <div className="formGroup">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
            {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <p className="toggleText">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
