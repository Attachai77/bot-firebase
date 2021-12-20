import { LINE_HEADER, LINE_MESSAGING_API } from '../config';
import { IPayloadEvent } from '../interface';
import * as request from 'request-promise';

export default (req: IPayloadEvent) => {
    const { events } = req;
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    // text: `${events[0].message.text} / ${events[0].source.userId}`,
                    text: JSON.stringify(req)
                }
            ]
        })
    });
};
