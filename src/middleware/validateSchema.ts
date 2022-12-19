import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/logging';
import { IUser } from '../models/user';
import { IBook } from '../models/book';

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
            name: Joi.string().required()
        }),

        update: Joi.object<IUser>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),

        update: Joi.object<IBook>({
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};
