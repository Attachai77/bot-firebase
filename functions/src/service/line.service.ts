import * as request from 'request-promise';

export interface IVerifyByAccessToken {
    client_id: string;
    expires_in: number;
    scope: string;
}

export interface ILineProfile {
    userId: string;
    displayName: string;
    statusMessage: string;
    pictureUrl: string;
}

export const verifyByAccessToken = (
    accessToken: string
): Promise<IVerifyByAccessToken> => {
    return request({
        method: `GET`,
        uri: `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`,
        json: true
    }).then((response) => {
        return response;
    });
};
export const getProfileByAccessToken = (
    accessToken: string
): Promise<ILineProfile> => {
    return request({
        method: `GET`,
        uri: `https://api.line.me/v2/profile`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        json: true
    }).then((response) => {
        return response;
    });
};
