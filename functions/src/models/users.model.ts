import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
    _id: string;
    userId: string;
    name: string;
    active: boolean;
    deleted: boolean;
    email: string;
    imgUrl?: string;
}

// 2. Create a Schema corresponding to the document interface.
export const schema = new Schema<IUser>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    email: String,
    imgUrl: String
});

// 3. Create a Model.
export const UserModel = model<IUser>('User', schema);
