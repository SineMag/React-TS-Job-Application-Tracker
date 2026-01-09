import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JobApplication } from "../types";
import { getUserJobApplications } from "../services/api";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  // Load jobs for current user
  useEffect(() => {
    const loadJobs = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const userJobs = await getUserJobApplications(currentUser.id);
        setJobs(userJobs);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [currentUser]);

  if (!currentUser) return <div>Redirecting...</div>;
  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Total applications: {jobs.length}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}
