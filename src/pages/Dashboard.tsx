import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeartBroken, FaTrash, FaEdit } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

interface Job {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interviewed" | "Rejected";
  dateApplied: string;
  duties?: string;
  requirements?: string;
  userId: number;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  // form fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [duties, setDuties] = useState("");
  const [requirements, setRequirements] = useState("");

  // edit state
  const [editJobId, setEditJobId] = useState<number | null>(null);

  // Snackbar for user to be notified of any changes
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const showNotification = (message: string) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const API_URL = "http://localhost:3000/jobs";

  // Check if user is authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // fetch jobs for current user only
  const fetchJobs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?userId=${user.id}`);
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
    if (user) fetchJobs();
  }, [user]);

  // create or update job with user ID
  const handleSaveJob = async () => {
    if (!user) {
      showNotification("Please log in to save jobs");
      navigate("/login");
      return;
    }

    if (!company || !role || !status || !dateApplied) {
      showNotification("Please fill in all required fields.");
      return;
    }

    const jobData = { company, role, status, dateApplied, duties, requirements, userId: user.id };

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
      showNotification(`Job ${editJobId ? "updated" : "added"} successfully`);
    } catch (err) {
      console.error("Save error:", err);
      showNotification("⚠️ Could not save job.");
    }
  };

  // delete job
  const handleDeleteJob = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      fetchJobs();
      showNotification("Job deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      showNotification("⚠️ Could not delete job.");
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
    setStatus("Applied");
    setDateApplied("");
    setDuties("");
    setRequirements("");
    setEditJobId(null);
  };

  // handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
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

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "Interviewed":
        return "#e7fdcdff";
      case "Rejected":
        return "#fbe9cf";
      case "Applied":
      default:
        return "#f3f3f3";
    }
  };

  if (!user) return <div>Redirecting to login...</div>;

  return (
    <div className="dashboard" style={{ padding: "1rem" }}>
      {/* nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
        <h2>Job Application Tracker</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Welcome, {user.name}</span>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <main style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        {/* left form */}
        <div className="main" style={{ width: "30%" }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveJob(); }} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3>{editJobId ? "Edit Job" : "Add New Job"}</h3>
            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
            <select value={status} onChange={(e) => setStatus(e.target.value as Job["status"])} required style={{border:'2px solid #DDDDDD', height:'5vh', borderRadius:'10px' }}>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required />
            <input type="text" placeholder="Duties" value={duties} onChange={(e) => setDuties(e.target.value)} />
            <input type="text" placeholder="Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
            <button type="submit" style={{ padding: "0.75rem", background: "#7dbb42", color: "#fff", border: "none", borderRadius: "6px" }}>
              {editJobId ? "Update" : "Save"}
            </button>
            {editJobId && <button type="button" onClick={clearForm} style={{ padding: "0.75rem", background: "#ccc", border: "none", borderRadius: "6px" }}>Cancel</button>}
          </form>
        </div>

        {/* right jobs */}
        <div style={{ flex: 1 }}>
          {/* search/filter/sort */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <input type="text" placeholder="Search Job..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: "0.75rem" }} />
            <button style={{ padding: "0.75rem 1rem" }}><FaSearch /></button>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
         
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: "100%", padding: "0.75rem" }}>
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              
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
                <div key={job.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "6px", marginBottom: "1rem", backgroundColor: getStatusColor(job.status) }}>
                  <h3>{job.company}</h3>
                  <p><strong>Role:</strong> {job.role}</p>
                  
                  <p><strong>Status:</strong> {job.status}</p>
                  <p><strong>Date Applied:</strong> {job.dateApplied}</p>
                  {job.duties && <p><strong>Duties:</strong> {job.duties}</p>}
                  {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button onClick={() => handleEditJob(job)} style={{ padding: "0.5rem", background: "#ffc107", border: "none", borderRadius: "6px" }}><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteJob(job.id)} style={{ padding: "0.5rem", background: "#dc3545", color: "#fff", border: "none", borderRadius: "6px" }}><FaTrash /> Delete</button>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p><FaHeartBroken /> No jobs found.</p>
            )}
          </div>
        </div>
      </main>

      {/* Snackbar */}
      {showSnackbar && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}>
          {snackbarMessage}
        </div>
      )}
    </div>
  );
}
