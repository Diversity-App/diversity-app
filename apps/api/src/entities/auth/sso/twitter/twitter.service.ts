import qs from 'qs';
import axios from 'axios';
import { encode } from 'base-64';
import { Token, User } from '../../../../types.d';
import configuration from '../../../../../configuration';

export default class TwitterService {
    public static clientId: string = configuration.TWITTER_CLIENT_ID;
    public static clientSecret: string = configuration.TWITTER_CLIENT_SECRET;
    public static callbackUrl: string = configuration.TWITTER_CALLBACK_URL;
    public static redirectUrl: string = configuration.TWITTER_REDIRECT_URL;
    public static scope: string = configuration.TWITTER_SCOPE;
    public static state: string = configuration.TWITTER_STATE;

    static async fetchUser(token: string): Promise<User & any> {
        const res = await axios('https://api.twitter.com/2/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return await res.data;
    }

    static async fetchToken(code: string): Promise<Token & any> {
        const encoded = encode(TwitterService.clientId + ':' + TwitterService.clientSecret);
        const res = await axios(`https://api.twitter.com/2/oauth2/token`, {
            method: 'POST',
            headers: { Authorization: `Basic ${encoded}`, 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: TwitterService.redirectUrl,
                client_id: TwitterService.clientId,
                code_verifier: 'challenge',
            }),
        });
        return await res.data;
    }
}
