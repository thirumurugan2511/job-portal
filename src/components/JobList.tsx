import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Job } from '../services/jobService';
import JobCard from './JobCard';

const JobList: React.FC = () => {
    const jobs = useSelector((state: { jobs: { jobs: Job[] } }) => state.jobs.jobs);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Filter jobs based on search query
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container my-5'>
            <input 
                type="text" 
                placeholder="Search by title or company" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                className='form-control mb-4'
            />

            {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onApply={() => {}} />
            ))}
        </div>
    );
};

export default JobList;
