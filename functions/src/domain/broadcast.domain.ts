import { LINE_HEADER, LINE_MESSAGING_API } from '../config';
import * as request from 'request-promise';

export default (res: any, msg: any) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/broadcast`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            messages: [
                {
                    type: `text`,
                    text: msg
                }
            ]
        })
    })
        .then(() => {
            const ret = { message: 'Done' };
            return res.status(200).send(ret);
        })
        .catch((error) => {
            const ret = { message: `Sending error: ${error}` };
            return res.status(500).send(ret);
        });
};
