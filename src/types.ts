export interface JobApplication {
  id: string; // Unique identifier for each application
  company: string;
  position: string;
  status: 'Applied' | 'Pending' | 'Interview' | 'Offer' | 'Rejected';
  dateApplied: Date;
  notes?: string; // Optional field for additional notes
}