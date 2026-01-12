import { useState, useEffect } from "react";
import type { JobApplication } from "../types";
import type React from "react";

type Props = {
  onClose?: () => void;
  onSubmit: (
    application: JobApplication | Omit<JobApplication, "id">
  ) => void | Promise<void>;
  onCancel?: () => void;
  initialData?: JobApplication | null;
};

export default function JobApplicationForm({
  onClose,
  onSubmit,
  onCancel,
  initialData,
}: Props) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied" as JobApplication["status"],
    dateApplied: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company,
        position: initialData.position,
        status: initialData.status,
        dateApplied: new Date(initialData.dateApplied)
          .toISOString()
          .split("T")[0],
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  // Prevent body scroll when form is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      dateApplied: new Date(formData.dateApplied),
    };

    if (initialData) {
      onSubmit({ ...applicationData, id: initialData.id });
    } else {
      onSubmit(applicationData);
    }
    onClose?.(); // close modal after save
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-backdrop">
      <div className="job-form-card">
        <button
          className="form-close"
          onClick={handleCancel}
          aria-label="Close"
        >
          ×
        </button>
        <h2>{initialData ? "Edit Application" : "Add New Application"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
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
              placeholder="Enter job position"
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
              placeholder="Add any additional notes about this application..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary">
              {initialData ? "Update" : "Add"} Application
            </button>
            <button type="button" className="btn ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
