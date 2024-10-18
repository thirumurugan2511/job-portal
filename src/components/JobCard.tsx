import React, { useState } from 'react';
import { Job } from '../services/jobService';
import ApplicationForm from './ApplicationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';

interface JobCardProps {
    job: Job;
    onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
    const [showModal, setShowModal] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [isApplied, setIsApplied] = useState(job.applied);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [appliedData, setAppliedData] = useState<any>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    const handleApplyClick = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
        } else {
            setShowModal(true);
        }
    };

    const handleApplyNowClick = () => {
        setShowApplicationForm(true);
    };

    const handleSubmit = (formData: any) => {
        console.log('Form submitted with:', formData);
        setAppliedData(formData);
        setIsApplied(true);
        setShowApplicationForm(false);
        setShowSuccessModal(true);
        setShowModal(false);
    };

    const handleTitleClick = () => {
        if (isApplied) {
            setShowModal(true);
            setShowApplicationForm(false);
        }
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    return (
        <>
            <div className='mb-3 border-bottom justify-content-between d-flex pb-3'>
                <div className="d-flex align-items-center">
                    <h3 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                        {job.title}, <span className='text-small'>{job.company}</span>
                    </h3>
                </div>
                <button className='btn btn-primary' onClick={handleApplyClick} disabled={isApplied}>
                    {isApplied ? 'Applied' : 'Apply'}
                </button>
            </div>

            {/* Bootstrap Modal for Job Details */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex={-1} role="dialog" aria-labelledby="jobModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="jobModalLabel">{job.title}</h5>
                        </div>
                        <div className="modal-body">
                            {isApplied && appliedData ? (
                                <>
                                    <h5>Application Submitted</h5>
                                    <p><strong>First Name:</strong> {appliedData.firstName}</p>
                                    <p><strong>Last Name:</strong> {appliedData.lastName}</p>
                                    <p><strong>Email:</strong> {appliedData.email}</p>
                                    <p><strong>Skills:</strong> {appliedData.skills.map((skill: any) => skill.label).join(', ')}</p>
                                    <p><strong>About Me:</strong> {appliedData.aboutMe}</p>
                                </>
                            ) : (
                                <>
                                    {!showApplicationForm && (
                                        <>
                                            {job.logoUrl && (
                                                <img
                                                    src={job.logoUrl}
                                                    alt={`${job.company} logo`}
                                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                />
                                            )}
                                            <span>{job.company}</span>
                                            <p>{job.title}</p>
                                            <p>Skills: {job.skills.join(', ')}</p>
                                            <p>Job description: {job.description}</p>
                                            <p>Experience: {job.experience} years</p>
                                            <button className="btn btn-primary" onClick={handleApplyNowClick}>Apply Now</button>
                                        </>
                                    )}
                                    {showApplicationForm && (
                                        <ApplicationForm onSubmit={handleSubmit} />
                                    )}
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Application Submitted Successfully</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been submitted successfully.</p>
                                <p>Experience: {job.experience}</p>
                                <p>Skills: {job.skills.join(', ')}</p>
                                <p>Description: {job.description}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowSuccessModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <LoginModal onClose={handleLoginModalClose} />
            )}
        </>
    );
};

export default JobCard;
