import './bootstrap';
import * as functions from 'firebase-functions';
import * as request from 'request-promise';
// import * as cors from 'cors';
import * as moment from 'moment-timezone';
import { getUserByLineUserId } from './data';
import { WebhookEventTypes } from './interface';
import follow from './domain/follow.domain';
import unfollow from './domain/unfollow.domain';
import push from './domain/push.doamin';
import broadcastPushAll from './domain/broadcast.domain';
import handleMessage from './domain/handleMessage.domain';
import postBack from './domain/postBack.domain';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import * as path from 'path';

useContainer(Container);
const app = createExpressServer({
    controllers: [path.join(__dirname + '/controllers/*.js')]
});

moment.tz.setDefault('Asia/Bangkok');

export const lineBot = functions.https.onRequest(async (req, res) => {
    //Sample a one webhook, Actually A webhook sent from the LINE may contain multiple webhook events.
    const eventType = req.body.events[0].type;
    switch (eventType) {
        case WebhookEventTypes.FOLLOW:
            follow(req.body);
            break;
        case WebhookEventTypes.UNFOLLOW:
            unfollow(req.body);
            break;
        case WebhookEventTypes.MESSAGE:
            handleMessage(req.body, res);
            // reply(req.body);
            break;
        case WebhookEventTypes.POST_BACK:
            await postBack(req.body);
            break;
        default:
            break;
    }

    return;
});

export const lineBotPush = functions.https.onRequest(async (req, res) => {
    const zipCode = req?.body?.zipCode || '10330';
    return request({
        method: `GET`,
        uri: `https://api.openweathermap.org/data/2.5/weather?units=metric&type=accurate&zip=${zipCode},th&appid=db2ae204b97d751eb88a91c7ffc14de2`,
        json: true
    })
        .then((response) => {
            const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
            return push(res, message, 'U6272a7d41c09bde82d23685d1fef9862');
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
});

export const clockIn = functions.https.onRequest((req, res) => {
    const { lineUserId } = req.body;
    const user = getUserByLineUserId(lineUserId);
    if (!user) {
        console.error(`User ${lineUserId} not found`);
        return push(res, 'User not found', lineUserId);
    }

    console.info(`User ${lineUserId} has clocked in successfully`);
    return push(res, 'You have clocked in successfully', lineUserId);
});

export const broadcast = functions.https.onRequest((req: any, res: any) => {
    const text = req.body.text;
    if (text !== undefined && text.trim() !== ``) {
        return broadcastPushAll(res, text);
    } else {
        const ret = { message: 'Text not found' };
        return res.status(400).send(ret);
    }
});

exports.api = functions.https.onRequest(app);
