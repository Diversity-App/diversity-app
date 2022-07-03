import axios from 'axios';
import { Token, User } from '../../../../types.d';
import configuration from '../../../../../configuration';
import qs from 'qs';

export default class InstagramService {
    public static clientId: string = configuration.INSTAGRAM_CLIENT_ID;
    public static clientSecret: string = configuration.INSTAGRAM_CLIENT_SECRET;
    public static callbackUrl: string = configuration.INSTAGRAM_CALLBACK_URL;
    public static redirectUrl: string = configuration.INSTAGRAM_REDIRECT_URL;
    public static scope: string = configuration.INSTAGRAM_SCOPE;
    public static state: string = configuration.INSTAGRAM_STATE;

    static async fetchUser(token: string): Promise<User & any> {
        const params = {
            fields: 'id,username',
            access_token: token,
        };

        const res = await axios(`https://graph.instagram.com/me?${new URLSearchParams(params).toString()}`, {});
        return await res.data;
    }

    static async fetchToken(code: string): Promise<Token & any> {
        const res = await axios(`https://api.instagram.com/oauth/access_token`, {
            method: 'POST',
            data: qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: InstagramService.redirectUrl,
                client_id: InstagramService.clientId,
                client_secret: InstagramService.clientSecret,
            }),
        });
        return await res.data;
    }
}
