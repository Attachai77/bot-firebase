import * as line from '@line/bot-sdk';
import { CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET } from '../config';

const config = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
};

const client = new line.Client(config);

export default client;
