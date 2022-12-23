import mongoose, { Document, Schema } from 'mongoose';

export interface IJob {
    userId: string;
    title: string;
    description: string;
    location: string;
    jobType: string;
    yearOfExperuience: string;
    skill: string;
}

export interface IJobModel extends IJob, Document {}

const IJobSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        jobType: {
            type: String,
            required: true
        },
        yearOfExperience: {
            type: String,
            required: true
        },
        skill: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IJobModel>('Job', IJobSchema);
