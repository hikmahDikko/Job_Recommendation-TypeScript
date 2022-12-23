import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    skill: string;
    yearOfExperience: string;
    role: string;
}

export interface IUserModel extends IUser, Document {}

const IUserSchema: Schema = new Schema(
    {
        fullName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [isEmail, 'Please enter valid email']
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        confirmPassword: {
            type: String,
            required: true,
            select: false
        },
        skill: {
            type: String
        },
        yearOfExperience: {
            type: String
        },
        role: {
            type: String,
            enum: ['employee', 'employer', 'admin'],
            default: 'employee'
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', IUserSchema);
