import { UserModel } from '../models/users.model';

export class Users {
    async find() {
        const results = await UserModel.find({});
        return results.map((r: any) => r.toObject());
    }

    async findById(_id: string) {
        const result = await UserModel.findById(_id);
        return result?.toObject();
    }

    async findOne(filter: any = {}) {
        const result = await UserModel.findOne(filter);
        return result?.toObject();
    }

    async create(body: any) {
        const result = await UserModel.create(body);
        return result?.toObject();
    }

    async update(body: any, filter: any) {
        const result = await UserModel.findOneAndUpdate(filter, body);
        return result?.toObject();
    }

    async delete(filter: any) {
        const result = await UserModel.findOneAndUpdate(filter, {
            deleted: true
        });
        return result?.toObject();
    }
}
