import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Job from '../models/job';

const createJob = (req: Request, res: Response, next: NextFunction) => {
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

const readJob = (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    return Job.findById(jobId)
        .then((job) => (job ? res.status(200).json({ job }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const jobs = Job.find();
    return jobs.then((jobs) => res.status(200).json({ datas: jobs })).catch((error) => res.status(500).json({ error }));
};

const updateJob = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.userId;
    return Job.findById(bookId)
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

const deleteJob = (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.bookId;
    return Job.findByIdAndDelete(jobId)
        .then((job) => (job ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
export default { createJob, readAll, readJob, updateJob, deleteJob };
