import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Job from '../models/job';

const createJob = async (req: Request, res: Response) => {
    const { title, skill, location, description, jobType, yearOfExperience } = req.body;
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        skill,
        location,
        jobType,
        yearOfExperience
    });

    return job
        .save()
        .then(() => res.status(201).json({ job }))
        .catch((error) => res.status(500).json({ error }));
};

const readJob = async (req: Request, res: Response) => {
    const jobId = req.params.jobId;
    return await Job.findById(jobId)
        .then((job) => (job ? res.status(200).json({ job }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = async (req: Request, res: Response) => {
    const jobs = Job.find();
    return jobs.then((jobs) => res.status(200).json({ datas: jobs })).catch((error) => res.status(500).json({ error }));
};

const updateJob = async (req: Request, res: Response) => {
    const bookId = req.params.userId;
    return await Job.findById(bookId)
        .select('-__v')
        .then((job) => {
            if (job) {
                job.set(req.body);
                return job
                    .save()
                    .then((job) => res.status(201).json({ job }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteJob = async (req: Request, res: Response) => {
    const jobId = req.params.bookId;
    return await Job.findByIdAndDelete(jobId)
        .then((job) => (job ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
export default { createJob, readAll, readJob, updateJob, deleteJob };
