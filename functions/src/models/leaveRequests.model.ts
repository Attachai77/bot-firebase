import { Schema, model } from 'mongoose';
import { IUser } from './users.model';

export enum LeaveRequestType {
    SICK_LEAVE = 'sick',
    VACATION_LEAVE = 'vacation',
    BUSINESS_LEAVE = 'business'
}

export enum LeaveDuration {
    FULL_DAY = 'fullday',
    HALF_DAY = 'halfday'
}

export interface ILeaveRequest {
    _id: string;
    requestType: LeaveRequestType;
    duration: LeaveDuration;
    dateFrom: string;
    dateTo: string;
    deleted: boolean;
    note: string;
    createdAt: string;
    requesterId: string | IUser;
    approverId: string | IUser;
}

export const schema = new Schema<ILeaveRequest>({
    requestType: { type: String, required: true, enum: LeaveRequestType },
    duration: { type: String, required: true, enum: LeaveDuration },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: false, default: '' },
    note: { type: String, required: false },
    deleted: { type: Boolean, default: false },
    createdAt: { type: String, default: new Date().toISOString() },
    requesterId: { type: Schema.Types.ObjectId, ref: 'User' },
    approverId: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

// 3. Create a Model.
export const LeaveRequestModel = model<ILeaveRequest>('LeaveRequest', schema);