import { Service } from 'typedi';
import { Users } from '../repositories/users.repo';
import lineClientService from '../service/line-client';
import { RICH_MENU } from './postBack.domain';

@Service()
export class UserDomain {
    constructor(private userRepo: Users) {}

    async list() {
        const users = await this.userRepo.find();
        return users;
    }

    async activateCode(userId: string) {
        try {
            await this.userRepo.update(
                {
                    activated: true
                },
                {
                    userId
                }
            );
        } catch (error) {
            console.log('activateCode error', error);
            throw error;
        }

        await lineClientService.linkRichMenuToUser(userId, RICH_MENU.CLOCK_IN);
    }
}
