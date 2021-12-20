import { IPayloadEvent } from '../interface';
import { Users } from '../repositories/users.repo';
import lineClientService from '../service/line-client';

const isAlreadyCreated = async (
    userId: string
): Promise<boolean | undefined> => {
    try {
        const usersRepo = new Users();
        const user = await usersRepo.findOne({ userId });
        return !!user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default async (req: IPayloadEvent) => {
    const { events } = req;
    const usersRepo = new Users();
    const source = events?.[0]?.source;

    let userLine;
    try {
        userLine = await lineClientService.getProfile(source.userId);
    } catch (error) {
        console.log(`get line user error`, JSON.stringify(error));
        throw error;
    }

    const alreadyCreated = await isAlreadyCreated(userLine.userId);
    if (alreadyCreated) {
        const updateUser = await usersRepo.update(
            {
                active: true
            },
            { userId: userLine.userId }
        );
        console.log({ updateUser });
    } else {
        //
        const createUser = await usersRepo.create({
            userId: source.userId,
            name: userLine.displayName,
            imgUrl: userLine.pictureUrl
        });
        console.log({ createUser });
    }

    console.log(`User ${events[0].source.userId} has been added.`);
    return;
};
