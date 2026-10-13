import {jobs} from '../features/jobs/jobsData';

export async function fetchJobs(){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return jobs;
}  

export async function fetchJobById(id) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const job = jobs.find((job) => job.id === Number(id));

    if (!job) {
        throw new Error("Job not found");
    }

    return job;
}