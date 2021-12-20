import { IPayloadEvent } from '../interface';
import reply from './reply.domain';
// import push from './push.doamin';
import lineClientService from '../service/line-client';

export default (req: IPayloadEvent, res: any) => {
    const { events } = req;
    // const cuurentTime = new Date();
    console.log('event type ====>', events[0].message.text);

    switch (events[0].message.text.toLowerCase()) {
        case 'leave':
            return lineClientService.pushMessage(
                'U6272a7d41c09bde82d23685d1fef9862',
                [
                    {
                        type: 'flex',
                        altText: 'A employee request leave',
                        contents: {
                            type: 'bubble',
                            size: 'mega',
                            direction: 'ltr',
                            hero: {
                                type: 'image',
                                url: 'https://sprofile.line-scdn.net/0h03V55Z-ebxx7THhCPT8RYwscbHZYPTYOXigiL0hOMigRfy4aUSlzeUscN34VfXtNVn0mck5MYSh3Xxh6ZRqTKHx8MStCey5LUisl-g',
                                size: 'full',
                                aspectRatio: '20:13',
                                aspectMode: 'cover'
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
                                                        text: 'Cristiano Ronaldo',
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
                                                        text: 'ไม่สบาย เป็นไข้ ปวดหัว ปวดใจ😔',
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
                ]
            );
        default:
            return reply(req);
    }
};
