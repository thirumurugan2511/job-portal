import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select, { MultiValue } from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Option Type
interface OptionType {
    value: string;
    label: string;
}

// Options for skills
const skillOptions: OptionType[] = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'CSS', label: 'CSS' },
];

interface ApplicationFormProps {
    onSubmit: (formData: any) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            skills: [] as MultiValue<OptionType>,
            aboutMe: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            skills: Yup.array().min(1, 'At least one skill is required'),
            aboutMe: Yup.string().required('About Me is required')
        }),
        onSubmit: (values) => {
            onSubmit(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input className = "mb-2"
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    placeholder="First Name"
                    required
                />
                {formik.errors.firstName && <div>{formik.errors.firstName}</div>}
            </div>
            <div>
                <input className = "mb-2"
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    placeholder="Last Name"
                    required
                />
                {formik.errors.lastName && <div>{formik.errors.lastName}</div>}
            </div>
            <div>
                <input className = "mb-2"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Your Email"
                    required
                />
                {formik.errors.email && <div>{formik.errors.email}</div>}
            </div>
            <div>
                <Select className = "mb-2"
                    isMulti
                    name="skills"
                    options={skillOptions}
                    onChange={(selectedOptions) =>
                        formik.setFieldValue('skills', selectedOptions)
                    }
                    value={formik.values.skills}
                />
                {formik.errors.skills && (
                    <div>
                        {/* Safely convert array errors to string */}
                        {typeof formik.errors.skills === 'string' ? formik.errors.skills : 'Select at least one skill'}
                    </div>
                )}
            </div>
            <div>
                <ReactQuill className = "mb-2"
                    value={formik.values.aboutMe}
                    onChange={(value) => formik.setFieldValue('aboutMe', value)}
                />
                {formik.errors.aboutMe && <div>{formik.errors.aboutMe}</div>}
            </div>
            <button type="submit" className='btn btn-primary'>Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
