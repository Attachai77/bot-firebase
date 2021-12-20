import * as queryString from 'query-string';
import * as momentTz from 'moment-timezone';
import { IPayloadEvent, PostBackAction } from '../interface';
import lineClientService from '../service/line-client';
import { Attendances } from '../repositories/attendances.repo';
import { AttendanceType } from '../models/attendances.model';
import { Users } from '../repositories/users.repo';

const RICH_MENU = {
    CLOCK_IN: 'richmenu-dbcc188042484aef357ec3c97afddb85',
    CLOCK_OUT: 'richmenu-d986640185729f29e9b4df0d706d6a1c'
    // CLOCK_IN: 'richmenu-c0db67c9605479b378a2b57f4bdf7d0f',
    // CLOCK_OUT: 'richmenu-593bf5e6f7e1308830e162221097fa51'
};

const clockin = async (req: IPayloadEvent) => {
    const userId = req.events[0].source.userId;
    const replyToken = req.events[0].replyToken;
    const currentTime = momentTz();
    const currentTimeReply = currentTime.format('LTS  D-MMM');
    const replyMessage = `ลงชื่อเข้างานสำเร็จ \n${currentTimeReply}`;
    const userRepo = new Users();
    let user;
    try {
        user = await userRepo.findOne({ userId });
    } catch (error) {
        console.log('get user error', JSON.stringify(error));
        throw error;
    }

    const attendancesRepo = new Attendances();
    try {
        await attendancesRepo.create({
            userId,
            type: AttendanceType.CLOCK_IN,
            datetime: currentTime.toISOString(),
            user: user?._id
        });
    } catch (error) {
        console.error('clock in error', JSON.stringify({ error }));
        throw error;
    }

    await Promise.all([
        lineClientService.linkRichMenuToUser(userId, RICH_MENU.CLOCK_OUT),
        lineClientService.replyMessage(replyToken, {
            type: 'text',
            text: replyMessage
        })
    ]);
};

const clockout = async (req: IPayloadEvent) => {
    const userId = req.events[0].source.userId;
    const replyToken = req.events[0].replyToken;
    const currentTime = momentTz();
    const currentTimeReply = currentTime.format('LTS  D-MMM');
    const replyMessage = `ลงชื่อออกงานสำเร็จ \n${currentTimeReply}`;

    const userRepo = new Users();
    let user;
    try {
        user = await userRepo.findOne({ userId });
    } catch (error) {
        console.log('get user error', JSON.stringify(error));
        throw error;
    }

    const attendancesRepo = new Attendances();
    try {
        await attendancesRepo.create({
            userId,
            type: AttendanceType.CLOCK_OUT,
            datetime: currentTime.toISOString(),
            user: user?._id
        });
    } catch (error) {
        console.error('clock out error', JSON.stringify({ error }));
        throw error;
    }

    await Promise.all([
        lineClientService.linkRichMenuToUser(userId, RICH_MENU.CLOCK_IN),
        lineClientService.replyMessage(replyToken, {
            type: 'text',
            text: replyMessage
        })
    ]);
};

export default async (req: IPayloadEvent) => {
    const dataString = req.events[0].postback.data;
    const data = queryString.parse(dataString);
    const action = data.action;

    switch (action) {
        case PostBackAction.CLOCK_IN:
            await clockin(req);
            break;
        case PostBackAction.CLOCK_OUT:
            await clockout(req);
            break;
        default:
            break;
    }

    return;
};
