import { Service } from 'typedi';
import { Users } from '../repositories/users.repo';

@Service()
export class UserDomain {
    constructor(private userRepo: Users) {}

    async list() {
        const users = await this.userRepo.find();
        return users;
    }
}
