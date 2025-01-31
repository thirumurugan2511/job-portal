
export interface Job {
    id: number;
    title: string;
    company: string;
    experience: number;
    skills: string[];
    description: string;
    applied: boolean;
    logoUrl: string;
}



const staticJobs: Job[] = [
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


export const fetchJobs = async (): Promise<Job[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(staticJobs); 
        }, 1000); 
    });
};
