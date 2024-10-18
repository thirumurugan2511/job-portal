
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../services/jobService';

const initialJobs: Job[] = [
    {
        id: 1,
        title: 'Software Engineer',
        company: 'Tech Company',
        skills: ['JavaScript', 'React', 'Node.js'],
        description: 'Develop and maintain web applications.',
        experience: 2,
        applied: false,
        logoUrl:'',
    },
    {
        id: 2,
        title: 'Data Analyst',
        company: 'Data Corp',
        skills: ['SQL', 'Python', 'Excel'],
        description: 'Analyze data and provide insights.',
        experience: 1,
        applied: false,
        logoUrl:'',
    },
];

interface JobsState {
    jobs: Job[];
}

const initialState: JobsState = {
    jobs: initialJobs,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<Job>) => {
            state.jobs.push(action.payload);
        },
        updateJob: (state, action: PayloadAction<Job>) => {
            const index = state.jobs.findIndex(job => job.id === action.payload.id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
            }
        },
        deleteJob: (state, action: PayloadAction<number>) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload);
        },
    },
});

export const { addJob, updateJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
