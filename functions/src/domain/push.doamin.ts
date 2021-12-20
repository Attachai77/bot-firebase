import * as request from 'request-promise';
import { LINE_HEADER, LINE_MESSAGING_API } from '../config';

export default (res: any, msg: string, lineUserId: string) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            to: lineUserId,
            messages: [
                {
                    type: `text`,
                    text: msg
                }
            ]
        })
    })
        .then(() => {
            return res.status(200).send(`Done`);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
