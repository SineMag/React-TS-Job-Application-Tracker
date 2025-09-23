import { useState, useEffect } from 'react';
import type { JobApplication } from '../types';

interface JobApplicationFormProps {
  onSubmit: (application: JobApplication | Omit<JobApplication, 'id'>) => void | Promise<void>;
  onCancel: () => void;
  initialData?: JobApplication | null;
}

export default function JobApplicationForm({ onSubmit, onCancel, initialData }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied' as JobApplication['status'],
    dateApplied: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company,
        position: initialData.position,
        status: initialData.status,
        dateApplied: new Date(initialData.dateApplied).toISOString().split('T')[0],
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const applicationData = {
      ...formData,
      dateApplied: new Date(formData.dateApplied)
    };

    if (initialData) {
      onSubmit({ ...applicationData, id: initialData.id });
    } else {
      onSubmit(applicationData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="formOverlay">
      <div className="applicationForm">
        <h2>{initialData ? 'Edit Application' : 'Add New Application'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="dateApplied">Date Applied</label>
            <input
              type="date"
              id="dateApplied"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="formButtons">
            <button type="submit" className="submitButton">
              {initialData ? 'Update' : 'Add'} Application
            </button>
            <button type="button" className="cancelButton" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
