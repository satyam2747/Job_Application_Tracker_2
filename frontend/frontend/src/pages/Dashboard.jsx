import React, { useEffect, useState } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    api.get('jobs').then(r => setJobs(r.data));
  }, [refresh]);

  const remove = async id => {
    await api.delete(`jobs/${id}`);
    setRefresh(x => x + 1);
  };

  return (
    <div className="dashboard">
      <h2>Your Applications</h2>
      <div className="jobs-grid">
        {jobs.map(j =>
          <JobCard key={j.id} job={j} onDelete={remove} onEdit={() => {/* open form */}} />
        )}
      </div>
    </div>
  );
}
