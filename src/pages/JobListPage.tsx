import React from 'react';
import JobList from '../components/JobList';
import Header from '../components/Header';

const JobListPage: React.FC = () => {
    return (
        <div>
            <Header />
            <JobList /> 
        </div>
    );
};

export default JobListPage;
