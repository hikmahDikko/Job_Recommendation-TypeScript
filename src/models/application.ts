import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication {
    userId: string;
    jobId: string;
    status: string;
}

export interface IApplicationModel extends IApplication, Document {}

const IJobSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Job'
        },
        status: {
            type: String,
            enum: ['applied', 'shortlisted', 'accepted', 'rejected']
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IApplicationModel>('Applicaion', IJobSchema);
