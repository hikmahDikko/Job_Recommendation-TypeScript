import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    userId: string;
}

export interface IBookModel extends IBook, Document {}

const IBookSchema: Schema = new Schema(
    {
        ttle: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', IBookSchema);
