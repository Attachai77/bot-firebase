import { Service } from 'typedi';
import { LeaveRequestModel } from '../models/leaveRequests.model';

@Service()
export class LeaveRequests {
    async find() {
        const results = await LeaveRequestModel.find({}).populate(
            'requesterId'
        );
        return results.map((r: any) => r.toObject());
    }

    async findById(_id: string) {
        const result = await LeaveRequestModel.findById(_id);
        return result?.toObject();
    }

    async findOne(filter: any = {}) {
        const result = await LeaveRequestModel.findOne(filter);
        return result?.toObject();
    }

    async create(body: any) {
        const result = await LeaveRequestModel.create(body);
        return result?.toObject();
    }

    async update(body: any, filter: any) {
        const result = await LeaveRequestModel.findOneAndUpdate(filter, body);
        return result?.toObject();
    }

    async delete(filter: any) {
        const result = await LeaveRequestModel.findOneAndUpdate(filter, {
            deleted: true
        });
        return result?.toObject();
    }
}
