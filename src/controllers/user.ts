import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateToken } from '../middleware/authMiddleware';
import { config } from '../config/config';

const createUser = async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).json({
            message: "Password and confirm password inputs doesn't match"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash,
        confirmPassword: hash
    });

    const token = generateToken(user._id);
    //@ts-ignore
    res.cookie('jwt', token, { httpOnly: true, MAX_AGE: config.maxAge.age * 1000 });

    return user
        .save()
        .then(() =>
            res.status(201).json({
                status: 'success',
                token,
                data: {
                    user
                }
            })
        )
        .catch((error) => res.status(500).json({ error }));
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid email or password'
        });
    }

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const token = generateToken(user._id);
            //@ts-ignore
            res.cookie('jwt', token, { httpOnly: true, MAX_AGE: config.maxAge.age * 1000 });
            res.status(200).json({
                status: 'success',
                token,
                data: {
                    user
                }
            });
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }
    }
};

const readUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = async (req: Request, res: Response) => {
    const users = User.find();
    return users.then((users) => res.status(200).json({ datas: users })).catch((error) => res.status(500).json({ error }));
};

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, loginUser, readAll, readUser, updateUser, deleteUser };
