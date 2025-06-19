import React, { useState, useEffect } from 'react';

export default function JobForm({ jobData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    notes: '',
  });

  useEffect(() => {
    if (jobData) setForm(jobData);
  }, [jobData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        {['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <input
        type="date"
        name="appliedDate"
        value={form.appliedDate}
        onChange={handleChange}
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
