import axios from 'axios';
import { Token, User } from '../../../../types.d';
import configuration from '../../../../../configuration';

export default class GoogleService {
    public static clientId: string = configuration.GOOGLE_CLIENT_ID;
    public static clientSecret: string = configuration.GOOGLE_CLIENT_SECRET;
    public static callbackUrl: string = configuration.GOOGLE_CALLBACK_URL;
    public static redirectUrl: string = configuration.GOOGLE_REDIRECT_URL;
    public static scope: string = configuration.GOOGLE_SCOPE;
    public static state: string = configuration.GOOGLE_STATE;

    static async fetchUser(token: string): Promise<User & any> {
        const res = await axios(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await res.data;
    }

    static async fetchToken(code: string): Promise<Token & any> {
        const body = {
            code: code,
            client_id: GoogleService.clientId,
            client_secret: GoogleService.clientSecret,
            // Todo: Fix this
            redirect_uri: 'https://auth.expo.io/@area1234/diversity_app', // change @ to your expo account, will be changed to ngrok
            grant_type: 'authorization_code',
        };

        const res = await axios(`https://www.googleapis.com/oauth2/v4/token?${new URLSearchParams(body).toString()}`, {
            method: 'POST',
        });
        return await res.data;
    }
}
