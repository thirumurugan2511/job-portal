import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob as addJobAction, updateJob as updateJobAction, deleteJob as deleteJobAction } from '../redux/slices/jobsSlice'; // Redux actions for adding, updating, deleting jobs
import { Job } from '../services/jobService';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state: { jobs: { jobs: Job[] } }) => state.jobs.jobs); // Get jobs from Redux store
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const [newJob, setNewJob] = useState<Job>({
        id: Date.now(), // Generate unique ID
        title: '',
        company: '',
        experience: 0,
        skills: [],
        description: '',
        applied: false,
        logoUrl: '', // Initialize the logo URL field
    });

    const [isEditing, setIsEditing] = useState<number | null>(null); // Track which job is being edited

    // Handle input changes for adding new jobs or editing jobs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    // Handle skills input
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const skillsArray = e.target.value.split(',').map(skill => skill.trim());
        setNewJob({ ...newJob, skills: skillsArray });
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewJob({ ...newJob, logoUrl: reader.result as string }); // Set the image as a base64 string
            };
            reader.readAsDataURL(file); // Convert the file to a data URL (base64)
        }
    };

    // Submit the form for adding a new job
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addJobAction(newJob)); // Dispatch the new job to Redux
        setNewJob({ id: Date.now(), title: '', company: '', experience: 0, skills: [], description: '', applied: false, logoUrl: '' });
    };

    // Start editing a job
    const handleEdit = (job: Job) => {
        setNewJob(job);
        setIsEditing(job.id); // Set the job being edited
    };

    // Submit the edited job
    const handleUpdate = () => {
        dispatch(updateJobAction(newJob)); // Dispatch the updated job to Redux
        setIsEditing(null); // Stop editing mode
        setNewJob({ id: Date.now(), title: '', company: '', experience: 0, skills: [], description: '', applied: false, logoUrl: '' });
    };

    // Delete a job
    const handleDelete = (jobId: number) => {
        dispatch(deleteJobAction(jobId)); // Dispatch the delete action
    };

     // Filter jobs based on the search query
     const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container my-5'>
            <h1>Add New Job Posting</h1>
            <form className='my-5' onSubmit={isEditing ? handleUpdate : handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                />
                <input
                    type="text"
                    name="company"
                    value={newJob.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                />
                
                <input
                    type="number"
                    name="experience"
                    value={newJob.experience}
                    onChange={handleChange}
                    placeholder="Experience Required (years)"
                    required
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                />
                <input
                    type="text"
                    name="description"
                    value={newJob.description}
                    onChange={handleChange}
                    placeholder="Job Description"
                    required
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                />
                <input
                    type="text"
                    name="skills"
                    value={newJob.skills.join(', ')} // Convert skills array back to a comma-separated string
                    onChange={handleSkillsChange}
                    placeholder="Skills"
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                />

                {/* Image Upload Input */}
                <input
                    type="file"
                    name="logoUrl"
                    onChange={handleImageUpload}
                    className='col-lg-2 me-1 px-2 py-1 mb-2'
                    accept="image/*"
                />

                <button type="submit" className='btn btn-primary me-1 ms-2 col-lg-1 mb-1'>{isEditing ? 'Update Job' : 'Add Job'}</button>
            </form>

             {/* Search Input */}
             <div className="my-4">
                <input
                    type="text"
                    placeholder="Search by title or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='form-control'
                />
            </div>

            <h2>Job Listings</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Logo</th> {/* New column for the logo */}
                        <th>Title</th>
                        <th>Company</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map(job => (
                        <tr key={job.id}>
                            <td>
                                {job.logoUrl ? <img src={job.logoUrl} alt={`${job.company} logo`} style={{ width: '50px', height: '50px' }} /> : 'No Logo'}
                            </td>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.experience}</td>
                            <td>{job.skills.join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(job)} className='btn btn-secondary me-1'>Edit</button>
                                <button onClick={() => handleDelete(job.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
