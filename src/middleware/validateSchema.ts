import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/logging';
import { IUser } from '../models/user';
import { IJob } from '../models/job';
import { IApplication } from '../models/application';

export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const schema = {
    user: {
        create: Joi.object<IUser>({
            fullName: Joi.string(),
            email: Joi.string().required().lowercase(),
            password: Joi.string()
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/)
                .required(),
            confirmPassword: Joi.string()
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/)
                .required()
                .valid(Joi.ref('password')),
            role: Joi.string()
        }),

        login: Joi.object<IUser>({
            email: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            fullName: Joi.string(),
            email: Joi.string(),
            skill: Joi.string(),
            yearOfExperience: Joi.string()
        })
    },
    job: {
        create: Joi.object<IJob>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            skill: Joi.string().required(),
            jobType: Joi.string().required(),
            location: Joi.string().required()
        }),

        update: Joi.object<IJob>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            skill: Joi.string().required(),
            jobType: Joi.string().required(),
            location: Joi.string().required()
        })
    },
    applicaion: {
        create: Joi.object<IApplication>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            jobId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            status: Joi.string()
        }),
        update: Joi.object<IApplication>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            jobId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            status: Joi.string()
        })
    }
};
