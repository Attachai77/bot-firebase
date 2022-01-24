import { Service } from 'typedi';
import { AttendanceType } from '../models/attendances.model';
import { Attendances } from '../repositories/attendances.repo';
import { Users } from '../repositories/users.repo';
import {
    getProfileByAccessToken,
    ILineProfile,
    verifyByAccessToken
} from '../service/line.service';

@Service()
export class AttendanceDomain {
    constructor(private attendanceRepo: Attendances, private userRepo: Users) {}

    async list() {
        const attendances = await this.attendanceRepo.find();
        return attendances;
    }

    async clockIn(headers: any, body: any) {
        const accessToken = headers.authorization.replace('Bearer ', '');
        if (accessToken === '' || !headers?.authorization) {
            console.error('accessToken is invalid');
            throw new Error(`accessToken is invalid`);
        }

        try {
            await verifyByAccessToken(accessToken);
        } catch (error) {
            console.error(`verifyByAccessToken error`, error);
            throw error;
        }

        let userId;
        let profile: ILineProfile;
        let user;
        try {
            profile = await getProfileByAccessToken(accessToken);
            userId = profile.userId;
            user = await this.userRepo.findOne({
                userId
            });
        } catch (error) {
            console.error({ error });
            throw error;
        }

        try {
            const clockedIn = await this.attendanceRepo.create({
                userId,
                type: AttendanceType.CLOCK_IN,
                datetime: new Date().toISOString(),
                user: user?._id,
                location: {
                    lat: body.lat,
                    long: body.long
                }
            });
            return clockedIn;
        } catch (error) {
            console.error('clock in error', JSON.stringify({ error }));
            throw error;
        }
    }

    async clockOut(headers: any, body: any) {
        const accessToken = headers.authorization.replace('Bearer ', '');
        if (accessToken === '' || !headers?.authorization) {
            console.error('accessToken is invalid');
            throw new Error(`accessToken is invalid`);
        }

        try {
            await verifyByAccessToken(accessToken);
        } catch (error) {
            console.error(`verifyByAccessToken error`, error);
            throw error;
        }

        let userId;
        let profile: ILineProfile;
        let user;
        try {
            profile = await getProfileByAccessToken(accessToken);
            userId = profile.userId;
            user = await this.userRepo.findOne({
                userId
            });
        } catch (error) {
            console.error({ error });
            throw error;
        }

        try {
            const clockedIn = await this.attendanceRepo.create({
                userId,
                type: AttendanceType.CLOCK_OUT,
                datetime: new Date().toISOString(),
                user: user?._id,
                location: {
                    lat: body.lat,
                    long: body.long
                }
            });
            return clockedIn;
        } catch (error) {
            console.error('clock out error', JSON.stringify({ error }));
            throw error;
        }
    }
}
