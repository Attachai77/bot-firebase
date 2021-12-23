import { Service } from 'typedi';
import { Attendances } from '../repositories/attendances.repo';

@Service()
export class AttendanceDomain {
    constructor(private attendanceRepo: Attendances) {}

    async list() {
        const attendances = await this.attendanceRepo.find();
        return attendances;
    }
}
