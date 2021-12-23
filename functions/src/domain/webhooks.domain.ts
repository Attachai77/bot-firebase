import { Service } from 'typedi';
import { IPayloadEvent, WebhookEventTypes } from '../interface';
import reply from './reply.domain';
import follow from './follow.domain';
import unfollow from './unfollow.domain';
import postBack from './postBack.domain';

@Service()
export class WebHooksDomain {
    // constructor() {}

    async hookEvent(req: any, res: any) {
        const body: IPayloadEvent = req.body;
        const eventType: WebhookEventTypes = body.events[0].type;

        switch (eventType) {
            case WebhookEventTypes.FOLLOW:
                return follow(body);
            case WebhookEventTypes.UNFOLLOW:
                return unfollow(body);
            case WebhookEventTypes.MESSAGE:
                return reply(body);
            case WebhookEventTypes.POST_BACK:
                return await postBack(body);
            default:
                return reply(body);
        }
    }
}

export default (req: any, res: any) => {
    const webHooksDomain = new WebHooksDomain();
    return webHooksDomain.hookEvent(req, res);
};
