// src/types/index.ts
export interface Job {
    id: number;
    title: string;
    company: string;
    skills: string[];
    description: string;
    experience: number;
    applied: boolean;
}
