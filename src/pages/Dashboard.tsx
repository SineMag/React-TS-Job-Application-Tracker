import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeartBroken, FaSortDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  dateApplied: string;
}

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const API_URL = "http://localhost:3000/jobs";

  // fetch jobs from json-server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError("⚠️ Could not load jobs. Please check your server.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // search + filter + sort
  const filteredJobs = jobs
    .filter(
      (job) =>
        (job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "All" || job.status === filterStatus)
    )
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="dashboard">
      {/* nav for the dashboard page */}
      <nav className="dashNav">
        <div className="dashLogo">
          <h2>Job Application Tracker</h2>
        </div>
        <div className="dashHome">
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              gap: "1rem",
              cursor: "pointer",
            }}
          >
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* main section for dashboard */}
      <main style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        {/* left section */}
        <div className="leftMain">
          <button className="mainButtonLeft">Add New Job</button>
          <br />
          <form className="dashboardForm">
            <label>
              Company Name: <br />
              <input type="text" placeholder="Enter company name " />
            </label>
            <br />
            <label>
              Role: <br />
              <input type="text" placeholder="Enter job role/description " />
            </label>
            <br />
            <label>
              Status: <br />
              <input type="text" placeholder="Enter current status " />
            </label>
            <br />
            <label>
              Date Applied: <br />
              <input type="date" placeholder="Date applied in " />
            </label>
            <br />
            <label>
              Duties: <br />
              <input type="text" placeholder="Enter duties " />
            </label>
            <br />
            <label>
              Requirements: <br />
              <input type="text" placeholder="Enter requirements " />
            </label>
            <br />
            <button type="button" className="mainButtonLeft">
              Save
            </button>
          </form>
        </div>

        {/* right section */}
        <div className="rightMain" style={{ flex: 1 }}>
          {/* search bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Search Job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="searchButton">
              <FaSearch />
            </button>
          </div>

          {/* filter/sort */}
          <div className="filterSort" style={{ marginTop: "1rem" }}>
            <div className="filter">
              <CiFilter style={{ marginRight: "0.5rem", color: "black" }} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Accepted">Applied</option>
                <option value="Interview">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="sort">
              <FaSortDown style={{ marginRight: "0.5rem", color: "black" }} />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* loading / error / jobs */}
          <div style={{ marginTop: "1rem" }}>
            {loading && <p>Loading jobs...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
              <>
                {filteredJobs.length > 0 ? (
                  <div className="cardContainer">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="cardJob"
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "1rem",
                          marginBottom: "1rem",
                          background: "#fff",
                        }}
                      >
                        <h3>{job.company}</h3>
                        <p>
                          <strong>Role:</strong> {job.role}
                        </p>
                        <p>
                          <strong>Status:</strong> {job.status}
                        </p>
                        <p>
                          <strong>Date Applied:</strong> {job.dateApplied}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="noJobFound">
                    <FaHeartBroken /> No jobs found.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
