import { IPayloadEvent } from '../interface';
import { Users } from '../repositories/users.repo';

export default async (req: IPayloadEvent) => {
    const { events } = req;
    const usersRepo = new Users();
    const source = events?.[0]?.source;

    try {
        const updateUser = await usersRepo.update(
            {
                active: false
            },
            { userId: source.userId }
        );
        console.log({ updateUser });
    } catch (error) {
        console.error(`update user error`, JSON.stringify(error));
        throw error;
    }

    console.log(`User ${events[0].source.userId} has been removed.`);
    return;
};
