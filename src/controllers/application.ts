import { Request, Response } from 'express';
import Application from '../models/application';

const createApplication = async (req: Request, res: Response) => {
    const { jobId, status } = req.body;
    //@ts-ignore
    const userId = req.user.id;
    const application = new Application({
        userId,
        jobId,
        status
    });
    return application
        .save()
        .then(() => res.status(201).json({ application }))
        .catch((error: any) => res.status(500).json({ error }));
};

const readApplication = async (req: Request, res: Response) => {
    const applicationId = req.params.applicationId;
    return await Application.findById(applicationId)
        .then((application: any) => (application ? res.status(200).json({ application }) : res.status(404).json({ message: 'Not found' })))
        .catch((error: any) => res.status(500).json({ error }));
};
const readAll = async (req: Request, res: Response) => {
    const applications = Application.find();
    return applications.then((applications: any) => res.status(200).json({ datas: applications })).catch((error: any) => res.status(500).json({ error }));
};

const updateApplication = async (req: Request, res: Response) => {
    const applicationId = req.params.userId;
    return await Application.findById(applicationId)
        .then((application: any) => {
            if (application) {
                application.set(req.body);
                return application
                    .save()
                    .then((application: any) => res.status(201).json({ application }))
                    .catch((error: any) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error: any) => res.status(500).json({ error }));
};

const deleteApplication = async (req: Request, res: Response) => {
    const applicationId = req.params.applicationId;
    return await Application.findByIdAndDelete(applicationId)
        .then((application: any) => (application ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error: any) => res.status(500).json({ error }));
};

export default { createApplication, readAll, readApplication, updateApplication, deleteApplication };
