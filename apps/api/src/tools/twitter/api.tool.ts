import axios from 'axios';
import { ILiked } from './types';

export default class TwitterApiWrapper {
    static async getUserLikedTweets(userID: string, token: string): Promise<ILiked> {
        const url = `https://api.twitter.com/2/users/${userID}/liked_tweets`;
        const response = await axios(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        return data;
    }
}
