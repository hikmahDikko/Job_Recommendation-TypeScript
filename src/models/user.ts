import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
}

export interface IUserModel extends IUser, Document {}

const IUserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', IUserSchema);
