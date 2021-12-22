// import * as moment from 'moment-timezone';
import { Message } from '@line/bot-sdk/dist/types';
import { LeaveRequests } from '../repositories/leaveRequests.repo';
import lineClientService from '../service/line-client';
import {
    getProfileByAccessToken,
    ILineProfile,
    verifyByAccessToken
} from '../service/line.service';

export class LeaveRequestDomain {
    leaveRequests: any;
    constructor() {}

    async requestLeave(body: any, headers: any) {
        const accessToken = headers.authorization.replace('Bearer ', '');
        if (accessToken === '' || !headers?.authorization) {
            console.error('accessToken is invalid');
            throw new Error(`accessToken is invalid`);
        }

        try {
            await verifyByAccessToken(accessToken);
        } catch (error) {
            console.error(error);
            throw error;
        }

        try {
            const profile = await getProfileByAccessToken(accessToken);

            console.log({ profile });

            const leaveRequests = new LeaveRequests();
            const res = await leaveRequests.create(body);
            const getBubble = this.requestLeaveBubbleMessage(profile, body);
            await lineClientService.pushMessage(profile.userId, getBubble);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async action(leaveRequestId: string, body: string) {}

    async getRequestLeave() {
        const leaveRequests = new LeaveRequests();
        try {
            const requests = await leaveRequests.find();
            return requests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    requestLeaveBubbleMessage(profile: ILineProfile, data: any): Message[] {
        return [
            {
                type: 'flex',
                altText: 'A employee request leave',
                contents: {
                    type: 'bubble',
                    size: 'mega',
                    direction: 'ltr',
                    hero: {
                        type: 'image',
                        url: profile.pictureUrl,
                        size: 'full',
                        aspectRatio: '20:13',
                        aspectMode: 'cover',
                        action: {
                            type: 'uri',
                            uri: 'http://linecorp.com/',
                            label: 'test uri'
                        }
                    },
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'text',
                                text: 'Leave request',
                                weight: 'bold',
                                size: 'xl'
                            },
                            {
                                type: 'box',
                                layout: 'baseline',
                                contents: [
                                    {
                                        type: 'text',
                                        text: 'Sick leave',
                                        size: 'sm'
                                    }
                                ]
                            },
                            {
                                type: 'box',
                                layout: 'vertical',
                                margin: 'lg',
                                spacing: 'sm',
                                contents: [
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        spacing: 'sm',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'Employee:',
                                                color: '#aaaaaa',
                                                size: 'sm',
                                                flex: 2
                                            },
                                            {
                                                type: 'text',
                                                text: profile.displayName,
                                                wrap: true,
                                                color: '#666666',
                                                size: 'sm',
                                                flex: 5
                                            }
                                        ]
                                    },
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'Duration:',
                                                flex: 2,
                                                size: 'sm',
                                                color: '#aaaaaa'
                                            },
                                            {
                                                type: 'text',
                                                text: '2 Days',
                                                flex: 5,
                                                size: 'sm',
                                                color: '#666666'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        spacing: 'sm',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'Days:',
                                                color: '#aaaaaa',
                                                size: 'sm',
                                                flex: 1
                                            },
                                            {
                                                type: 'text',
                                                text: '15 Dec 2021 - 16 Dec 2021',
                                                wrap: true,
                                                color: '#666666',
                                                size: 'sm',
                                                flex: 5
                                            }
                                        ]
                                    },
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'Note:',
                                                size: 'sm',
                                                color: '#999999'
                                            },
                                            {
                                                type: 'text',
                                                text: 'ไม่วบาย เป็นไข้ ปวดหัว ปวดใจ😔',
                                                size: 'sm',
                                                color: '#666666',
                                                flex: 5
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    footer: {
                        type: 'box',
                        layout: 'vertical',
                        spacing: 'sm',
                        contents: [
                            {
                                type: 'button',
                                style: 'link',
                                height: 'sm',
                                action: {
                                    type: 'uri',
                                    label: 'Approve',
                                    uri: 'https://linecorp.com'
                                }
                            },
                            {
                                type: 'button',
                                style: 'link',
                                height: 'sm',
                                action: {
                                    type: 'uri',
                                    label: 'Reject',
                                    uri: 'https://linecorp.com'
                                }
                            },
                            {
                                type: 'spacer',
                                size: 'sm'
                            }
                        ],
                        flex: 0
                    }
                }
            }
        ];
    }
}
