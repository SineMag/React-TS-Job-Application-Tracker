import type { JobApplication } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const addJobApplication = async (userId: string, application: Omit<JobApplication, 'id'>): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/jobApplications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...application,
      userId,
      dateApplied: application.dateApplied.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add job application');
  }

  const data = await response.json();
  return data.id;
};

export const updateJobApplication = async (applicationId: string, updates: Partial<JobApplication>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/jobApplications/${applicationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...updates,
      dateApplied: updates.dateApplied ? updates.dateApplied.toISOString() : undefined,
      updatedAt: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update job application');
  }
};

export const deleteJobApplication = async (applicationId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/jobApplications/${applicationId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete job application');
  }
};

export const getUserJobApplications = async (userId: string): Promise<JobApplication[]> => {
  const response = await fetch(`${API_BASE_URL}/jobApplications?userId=${userId}&_sort=createdAt&_order=desc`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch job applications');
  }

  const data = await response.json();
  
  return data.map((item: any) => ({
    id: item.id,
    company: item.company,
    position: item.position,
    status: item.status,
    dateApplied: new Date(item.dateApplied),
    notes: item.notes || ''
  }));
};

// Simple authentication functions for demo purposes
export const signUp = async (email: string, _password: string): Promise<{ id: string; email: string }> => {
  // For demo purposes, we'll just create a user in localStorage
  const user = { id: Date.now().toString(), email };
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const signIn = async (email: string, _password: string): Promise<{ id: string; email: string }> => {
  // For demo purposes, accept any email/password combination
  const user = { id: '1', email };
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): { id: string; email: string } | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};
