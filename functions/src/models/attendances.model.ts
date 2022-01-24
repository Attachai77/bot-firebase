import { Schema, model } from 'mongoose';
import { IUser } from './users.model';

export enum AttendanceType {
    CLOCK_IN = 'CLOCK_IN',
    CLOCK_OUT = 'CLOCK_OUT'
}

export interface ILocation {
    lat?: number;
    long?: number;
}

export interface IAttendance {
    _id: string;
    userId: string;
    type: AttendanceType;
    datetime: string;
    deleted: boolean;
    createdAt: string;
    user: string | IUser;
    location: ILocation;
}

const LocationSchema = new Schema<ILocation>({
    lat: { type: Number, default: false },
    long: { type: Number, default: false }
});

export const schema = new Schema<IAttendance>({
    userId: { type: String, required: true },
    type: { type: String, required: true, enum: AttendanceType },
    datetime: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: String, default: new Date().toISOString() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    location: LocationSchema
});

// 3. Create a Model.
export const AttendanceModel = model<IAttendance>('Attendance', schema);
