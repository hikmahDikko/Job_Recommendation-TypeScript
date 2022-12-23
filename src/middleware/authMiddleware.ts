import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (id: any) => jwt.sign({ id }, config.jwtSecretKey.secretKey, { expiresIn: config.jwtExpiresIn.expiresIn });

//Authorization middleware
export const auth = (model: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(403).json({
                status: 'fail',
                message: 'User not login'
            });
        }
        //@ts-ignore
        const verifyJWT = jwt.verify(token, config.jwtSecretKey.secretKey, { expiresIn: config.jwtExpiresIn.expiresIn });

        const currentUser = await model.findById(verifyJWT.id);

        //@ts-ignore
        req.user = currentUser;

        next();
    };
};

export const checkRole = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        if (!req.user.role.includes(...roles)) {
            return res.status(401).json({
                message: 'You are not authorized to do this'
            });
        }
        next();
    };
};
