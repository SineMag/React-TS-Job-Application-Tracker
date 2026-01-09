import { Link } from "react-router-dom";
import WelcomeImage from "../assets/landing.png";


export default function Welcome() {
  return (
    <div className="welcomePage">
      {/* navigation */}


      {/* hero */}
      <div className="hero">
        <div className="heroText">
          <section style={{ padding: "60px", background: "#f9f9f9" }}>
            <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome</h1>
            <p style={{ fontSize: "1.4rem", maxWidth: "700px", margin: "0 auto 20px" }}>
              Track your applications, measure your progress, and stay ahead in your job search.
            </p>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto 15px" }}>
              Stay organized with all your job applications in one place. See where you’ve applied, what’s pending, and what’s next.
            </p>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
              Take control of your career journey with a simple, clear, and effective tracking tool.
            </p>
          </section>
          <Link to="/signup">
            <button className="getStartedButton">Get Started</button>
          </Link>
        </div>

        <div className="heroImage">
          <img className="landingImage" src={WelcomeImage} alt="Hero" />
          <hr className="circleTop"
            style={{ border: "none", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "#DBFA87" }}
          />
        </div>
      </div>

      {/*yellow circles */}
      <div className="circles">
        <hr style={{ border: "none", width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#DBFA87" }} />
        <hr style={{ border: "none", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#DBFA87" }} />
      </div>
    </div>
  );
}
