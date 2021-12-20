export enum WebhookEventTypes {
    MESSAGE = 'message', //send message
    FOLLOW = 'follow', //follow account
    UNFOLLOW = 'unfollow', //unfollow account
    JOIN = 'join', //bot ถูกเชิญเข้า group
    LEAVE = 'leave', //bot ถูกเชิญออก group
    MEMBER_JOINED = 'memberJoined',
    MEMBER_LEFT = 'memberLeft',
    POST_BACK = 'postback',
    BEACON = 'beacon', // ผู้ใช้เดินเข้าหรือออกรัศมีการทำงานของ LINE Beacon
    ACCOUNT_LINK = 'accountLink',
    THINGS = 'things'
}

export enum SourceType {
    USER = 'user',
    GROUP = 'group',
    ROOM = 'room'
}

export enum PostBackAction {
    CLOCK_IN = 'clockin',
    CLOCK_OUT = 'clockout'
}

export interface IPayloadEvent {
    destination: string;
    events: {
        type: WebhookEventTypes;
        source: {
            type: SourceType;
            userId: string;
        };
        replyToken: string;
        mode: string; //active //inactive
        message: {
            type: string;
            id: string;
            text: string;
        };
        timestamp: number;
        postback: {
            data: string;
        };
    }[];
}
