import axios from 'axios';
import SsoTool from '../sso.tool';
import { InstagramUser } from './types';

export default class InstagramApiWrapper {
    static async UserInfos(token: string): Promise<InstagramUser> {
        const params = {
            fields: 'id,username,media_count,account_type',
            access_token: token,
        };

        const response = await axios(`https://graph.instagram.com/me?${new URLSearchParams(params).toString()}`, {});
        const data = response.data;
        console.log(data);
        return data;
    }

    static async UserPosts(token: string): Promise<InstagramUser> {
        const params = {
            fields: 'id,media_type,media_url,username,timestamp',
            access_token: token,
        };
        const url = `https://graph.instagram.com/me/media`;
        const response = await axios({
            params,
            method: 'get',
            url: url,
        });
        const data = response.data;
        console.log(data);
        return data;
    }
}
