import { Service } from 'typedi';
import { AttendanceModel } from '../models/attendances.model';

@Service()
export class Attendances {
    async find() {
        const results = await AttendanceModel.find({}, null, {
            sort: { _id: -1 }
        }).populate('user');
        return results.map((r: any) => r.toObject());
    }

    async findById(_id: string) {
        const result = await AttendanceModel.findById(_id);
        return result?.toObject();
    }

    async findOne(filter: any = {}) {
        const result = await AttendanceModel.findOne(filter);
        return result?.toObject();
    }

    async create(body: any) {
        const result = await AttendanceModel.create(body);
        return result?.toObject();
    }

    async update(body: any, filter: any) {
        const result = await AttendanceModel.findOneAndUpdate(filter, body);
        return result?.toObject();
    }

    async delete(filter: any) {
        const result = await AttendanceModel.findOneAndUpdate(filter, {
            deleted: true
        });
        return result?.toObject();
    }
}
