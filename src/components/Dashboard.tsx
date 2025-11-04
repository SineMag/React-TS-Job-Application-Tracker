import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { JobApplication } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getUserJobApplications, addJobApplication, updateJobApplication, deleteJobApplication } from '../services/api';
import JobApplicationForm from './JobApplicationForm';
import JobApplicationList from './JobApplicationList';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  // Get URL parameters
  const searchQuery = searchParams.get('search') || '';
  const filterStatus = searchParams.get('filter') || '';
  const sortOrder = searchParams.get('sort') || '';

  // Load applications from Firestore on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadApplications = async () => {
      if (currentUser) {
        try {
          const userApplications = await getUserJobApplications(currentUser.id);
          setApplications(userApplications);
        } catch (error) {
          console.error('Error loading applications:', error);
        } finally {
          clearTimeout(timer);
          setLoading(false);
        }
      }
    };

    loadApplications();

    return () => clearTimeout(timer);
  }, [currentUser]);

  const handleAddApplication = async (newApplication: Omit<JobApplication, 'id'>) => {
    if (!currentUser) return;
    
    try {
      const docId = await addJobApplication(currentUser.id, newApplication);
      const application: JobApplication = {
        ...newApplication,
        id: docId,
      };
      setApplications(prev => [...prev, application]);
      setShowForm(false);
      showNotification(`Successfully added application for ${newApplication.position} at ${newApplication.company}!`, 'success');
    } catch (error) {
      console.error('Error adding application:', error);
      showNotification('Failed to add job application. Please try again.', 'error');
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
      // Get the application details before deletion for the notification
      const applicationToDelete = applications.find(app => app.id === id);
      await deleteJobApplication(id);
      setApplications(prev => prev.filter(app => app.id !== id));
      
      // Show success notification
      if (applicationToDelete) {
        showNotification(
          `Successfully deleted application for ${applicationToDelete.position} at ${applicationToDelete.company}!`, 
          'success'
        );
      } else {
        showNotification('Job application deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      showNotification('Failed to delete job application. Please try again.', 'error');
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

  // Filter, search, and sort applications
  const filteredAndSortedApplications = applications
    .filter(app => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = filterStatus === '' || app.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'date-asc') {
        return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
      } else if (sortOrder === 'date-desc') {
        return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
      }
      return 0; // No sorting
    });

  // Update URL parameters
  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
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

      {/* Search, Filter, and Sort Controls */}
      <div className="controlsSection">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchQuery}
            onChange={(e) => updateSearchParams('search', e.target.value)}
            className="searchInput"
          />
        </div>
        
        <div className="filtersRow">
          <div className="filterGroup">
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => updateSearchParams('filter', e.target.value)}
              className="filterSelect"
            >
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div className="filterGroup">
            <label htmlFor="sortOrder">Sort by Date:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => updateSearchParams('sort', e.target.value)}
              className="filterSelect"
            >
              <option value="">No Sorting</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>
        </div>
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
        applications={filteredAndSortedApplications}
        onEdit={startEditing}
        onDelete={handleDeleteApplication}
      />
    </div>
  );
}
