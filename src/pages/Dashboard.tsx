import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeartBroken, FaSortDown, FaTrash, FaEdit } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  dateApplied: string;
  duties?: string;
  requirements?: string;
}

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  // form fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [duties, setDuties] = useState("");
  const [requirements, setRequirements] = useState("");

  // edit state
  const [editJobId, setEditJobId] = useState<number | null>(null);

  const API_URL = "http://localhost:3000/jobs";

  // fetch jobs
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

  useEffect(() => {
    fetchJobs();
  }, []);

  // create or update job
  const handleSaveJob = async () => {
    if (!company || !role || !status || !dateApplied) {
      alert("Please fill in all required fields.");
      return;
    }

    const jobData = {
      company,
      role,
      status,
      dateApplied,
      duties,
      requirements,
    };

    try {
      let res;
      if (editJobId) {
        // update existing job
        res = await fetch(`${API_URL}/${editJobId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
      } else {
        // create new job
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
      }

      if (!res.ok) throw new Error("Failed to save job");

      fetchJobs();
      clearForm();
    } catch (err) {
      console.error("Save error:", err);
      alert("⚠️ Could not save job.");
    }
  };

  // delete job
  const handleDeleteJob = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      fetchJobs();
    } catch (err) {
      console.error("Delete error:", err);
      alert("⚠️ Could not delete job.");
    }
  };

  // edit job
  const handleEditJob = (job: Job) => {
    setEditJobId(job.id);
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDateApplied(job.dateApplied);
    setDuties(job.duties || "");
    setRequirements(job.requirements || "");
  };

  // clear form
  const clearForm = () => {
    setCompany("");
    setRole("");
    setStatus("");
    setDateApplied("");
    setDuties("");
    setRequirements("");
    setEditJobId(null);
  };

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
    <div className="dashboard" style={{ padding: "1rem" }}>
      {/* nav */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "0.5rem",
        }}
      >
        <h2>Job Application Tracker</h2>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
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
      </nav>

      <main style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        {/* left form */}
        <div  className="main" style={{ width: "30%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveJob();
            }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <h3>{editJobId ? "Edit Job" : "Add New Job"}</h3>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <input
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Duties"
              value={duties}
              onChange={(e) => setDuties(e.target.value)}
            />
            <input
              type="text"
              placeholder="Requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
            <button type="submit" style={{ padding: "0.75rem", background: "#7dbb42", color: "#fff", border: "none", borderRadius: "6px" }}>
              {editJobId ? "Update" : "Save"}
            </button>
            {editJobId && (
              <button type="button" onClick={clearForm} style={{ padding: "0.75rem", background: "#ccc", border: "none", borderRadius: "6px" }}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* right jobs */}
        <div style={{ flex: 1 }}>
          {/* search/filter/sort */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Search Job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, padding: "0.75rem" }}
            />
            <button style={{ padding: "0.75rem 1rem" }}>
              <FaSearch />
            </button>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ flex: 1 }}>
              <CiFilter />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: "100%", padding: "0.75rem" }}>
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <FaSortDown />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ width: "100%", padding: "0.75rem" }}>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* job list */}
          <div style={{ marginTop: "1rem" }}>
            {loading && <p>Loading jobs...</p>}
            {error && <p style={{ color: "#bd328e" }}>{error}</p>}
            {!loading && !error && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "6px",
                    marginBottom: "1rem",
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
                  {job.duties && <p><strong>Duties:</strong> {job.duties}</p>}
                  {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button onClick={() => handleEditJob(job)} style={{ padding: "0.5rem", background: "#ffc107", border: "none", borderRadius: "6px" }}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteJob(job.id)} style={{ padding: "0.5rem", background: "#dc3545", color: "#fff", border: "none", borderRadius: "6px" }}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p><FaHeartBroken /> No jobs found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
