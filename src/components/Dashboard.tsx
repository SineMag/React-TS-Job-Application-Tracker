import { useState, useEffect } from 'react';
import type { JobApplication } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { getUserJobApplications, addJobApplication, updateJobApplication, deleteJobApplication } from '../firebase/firestore';
import JobApplicationForm from './JobApplicationForm';
import JobApplicationList from './JobApplicationList';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  // Load applications from Firestore on component mount
  useEffect(() => {
    const loadApplications = async () => {
      if (currentUser) {
        try {
          const userApplications = await getUserJobApplications(currentUser.uid);
          setApplications(userApplications);
        } catch (error) {
          console.error('Error loading applications:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadApplications();
  }, [currentUser]);

  const handleAddApplication = async (newApplication: Omit<JobApplication, 'id'>) => {
    if (!currentUser) return;
    
    try {
      const docId = await addJobApplication(currentUser.uid, newApplication);
      const application: JobApplication = {
        ...newApplication,
        id: docId,
      };
      setApplications(prev => [...prev, application]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleEditApplication = async (updatedApplication: JobApplication) => {
    try {
      await updateJobApplication(updatedApplication.id, updatedApplication);
      setApplications(prev => 
        prev.map(app => app.id === updatedApplication.id ? updatedApplication : app)
      );
      setEditingApplication(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteJobApplication(id);
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const startEditing = (application: JobApplication) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loadingMessage">Loading your applications...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboardHeader">
        <h1>Job Application Dashboard</h1>
        <button 
          className="addButton"
          onClick={() => setShowForm(true)}
        >
          Add New Application
        </button>
      </div>

      {showForm && (
        <JobApplicationForm
          onSubmit={editingApplication ? 
            (app: JobApplication | Omit<JobApplication, 'id'>) => handleEditApplication(app as JobApplication) :
            handleAddApplication
          }
          onCancel={cancelForm}
          initialData={editingApplication}
        />
      )}

      <JobApplicationList
        applications={applications}
        onEdit={startEditing}
        onDelete={handleDeleteApplication}
      />
    </div>
  );
}
