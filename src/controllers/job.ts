import { Request, Response } from 'express';
import QueryMethod from '../../src/utils/query';
import Job from '../models/job';

const createJob = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.user.id;
    const { title, skill, location, description, jobType, yearOfExperience } = req.body;
    const job = new Job({
        userId,
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
    let queriedUsers = new QueryMethod(Job.find(), req.query).sort().filter().limit().paginate();
    let datas = await queriedUsers.query;
    res.status(200).json({
        status: 'success',
        results: datas.length,
        datas
    });
    return datas.then((datas: any) => res.status(200).json({ datas: datas })).catch((error: any) => res.status(500).json({ error }));
};

const readAllRecommendation = async (req: Request, res: Response) => {
    //@ts-ignore
    const user = req.user;
    let queriedUsers = new QueryMethod(Job.find({ skill: user.skill, yearOfExperuience: user.yearOfExperience }), req.query).sort().filter().limit().paginate();
    let datas = await queriedUsers.query;
    res.status(200).json({
        status: 'success',
        results: datas.length,
        datas
    });
    return datas.then((datas: any) => res.status(200).json({ datas: datas })).catch((error: any) => res.status(500).json({ error }));
};

const AllMyJobs = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.user.id;
    let queriedUsers = new QueryMethod(Job.find({ userId }), req.query).sort().filter().limit().paginate();
    let datas = await queriedUsers.query;
    res.status(200).json({
        status: 'success',
        results: datas.length,
        datas
    });
    return datas.then((datas: any) => res.status(200).json({ datas: datas })).catch((error: any) => res.status(500).json({ error }));
};

const updateJob = async (req: Request, res: Response) => {
    const jobId = req.params.jobId;

    //@ts-ignore
    const userId = req.user.id;

    const job = await Job.findById({ _id: jobId });

    if (job && job.userId === userId) {
        return await Job.findById(jobId)
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
    }
    return res.status(404).json({ message: 'You are not authorized to perform this action' });
};

const deleteJob = async (req: Request, res: Response) => {
    const jobId = req.params.jobId;

    //@ts-ignore
    const userId = req.user.id;

    const job = await Job.findById({ _id: jobId });

    if (job && job.userId === userId) {
        return await Job.findByIdAndDelete(jobId)
            .then((job) => (job ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
            .catch((error) => res.status(500).json({ error }));
    }
    return res.status(404).json({ message: 'You are not authorized to perform this action' });
};

export default { createJob, readAll, readAllRecommendation, AllMyJobs, readJob, updateJob, deleteJob };
