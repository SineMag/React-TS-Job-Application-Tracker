import type { JobApplication } from '../types';

interface JobApplicationListProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (id: string) => void;
}

export default function JobApplicationList({ applications, onEdit, onDelete }: JobApplicationListProps) {
  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'Applied': return '#007bff';
      case 'Pending': return '#ffc107';
      case 'Interview': return '#17a2b8';
      case 'Offer': return '#28a745';
      case 'Rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (applications.length === 0) {
    return (
      <div className="emptyState">
        <h3>No applications yet</h3>
        <p>Start tracking your job applications by adding your first one!</p>
      </div>
    );
  }

  return (
    <div className="applicationsList">
      <h2>Your Applications ({applications.length})</h2>
      
      <div className="applicationsGrid">
        {applications.map((application) => (
          <div key={application.id} className="applicationCard">
            <div className="cardHeader">
              <h3>{application.position}</h3>
              <span 
                className="statusBadge"
                style={{ backgroundColor: getStatusColor(application.status) }}
              >
                {application.status}
              </span>
            </div>
            
            <div className="cardBody">
              <p className="company">{application.company}</p>
              <p className="date">Applied: {formatDate(application.dateApplied)}</p>
              {application.notes && (
                <p className="notes">{application.notes}</p>
              )}
            </div>
            
            <div className="cardActions">
              <button 
                className="editButton"
                onClick={() => onEdit(application)}
              >
                Edit
              </button>
              <button 
                className="deleteButton"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this application?')) {
                    onDelete(application.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
