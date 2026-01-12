import type { JobApplication } from "../types";

// Use environment variable for API URL, fallback to /api for development proxy
// Remove trailing slash if present
const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL || "/api";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};
const API_BASE_URL = getApiBaseUrl();

export const addJobApplication = async (
  userId: string,
  application: Omit<JobApplication, "id">
): Promise<string> => {
  const dateApplied =
    application.dateApplied instanceof Date
      ? application.dateApplied
      : new Date(application.dateApplied);
  const url = `${API_BASE_URL}/jobApplications`;
  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("POST to:", url);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...application,
        userId,
        dateApplied: dateApplied.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`Failed to add job application: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error:", error);
      throw new Error("Failed to fetch: Backend server may not be running. Please start it with 'npm run backend' or 'cd backend && npm start'");
    }
    throw error;
  }
};

export const updateJobApplication = async (
  _userId: string,
  applicationId: string,
  updates: Partial<JobApplication>
): Promise<void> => {
  const body: Record<string, any> = { ...updates };
  if (updates.dateApplied) {
    const dateApplied =
      updates.dateApplied instanceof Date
        ? updates.dateApplied
        : new Date(updates.dateApplied);
    body.dateApplied = dateApplied.toISOString();
  }
  body.updatedAt = new Date().toISOString();

  const url = `${API_BASE_URL}/jobApplications/${applicationId}`;
  console.log("PATCH to:", url);
  
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`Failed to update job application: ${response.status} ${errorText}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error:", error);
      throw new Error("Failed to fetch: Backend server may not be running. Please start it with 'npm run backend' or 'cd backend && npm start'");
    }
    throw error;
  }
};

export const deleteJobApplication = async (
  _userId: string,
  applicationId: string
): Promise<void> => {
  const url = `${API_BASE_URL}/jobApplications/${applicationId}`;
  console.log("DELETE to:", url);
  
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`Failed to delete job application: ${response.status} ${errorText}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error:", error);
      throw new Error("Failed to fetch: Backend server may not be running. Please start it with 'npm run backend' or 'cd backend && npm start'");
    }
    throw error;
  }
};

export const getUserJobApplications = async (
  userId: string
): Promise<JobApplication[]> => {
  const url = `${API_BASE_URL}/jobApplications?userId=${userId}&_sort=createdAt&_order=desc`;
  console.log("GET to:", url);
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`Failed to fetch job applications: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return data.map((item: any) => ({
      id: item.id,
      company: item.company,
      position: item.position,
      status: item.status,
      dateApplied: new Date(item.dateApplied),
      notes: item.notes || "",
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error:", error);
      throw new Error("Failed to fetch: Backend server may not be running. Please start it with 'npm run backend' or 'cd backend && npm start'");
    }
    throw error;
  }
};

// Simple authentication functions for demo purposes
export const signUp = async (
  email: string,
  _password: string
): Promise<{ id: string; email: string }> => {
  // For demo purposes, we'll just create a user in localStorage
  const user = { id: Date.now().toString(), email };
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const signIn = async (
  email: string,
  _password: string
): Promise<{ id: string; email: string }> => {
  // For demo purposes, accept any email/password combination
  const user = { id: "1", email };
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = (): { id: string; email: string } | null => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};
