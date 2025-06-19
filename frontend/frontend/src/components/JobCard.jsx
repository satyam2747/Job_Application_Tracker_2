import React from 'react';

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <h3>{job.company} – {job.role}</h3>
      <p>Date: {job.appliedDate}</p>
      <p>Status: <strong>{job.status}</strong></p>
      <p>{job.notes}</p>
      <button onClick={() => onEdit(job)}>Edit</button>
      <button onClick={() => onDelete(job.id)}>Delete</button>
    </div>
  );
}
