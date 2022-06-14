import axios from 'axios';
import QueryString from 'qs';
import { ILiked, IProfile } from './types';

export default class TwitterApiWrapper {
    static async getUserLikedTweets(userID: string, token: string): Promise<ILiked> {
        const url = `https://api.twitter.com/2/users/${userID}/liked_tweets`;
        const response = await axios(url, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        return data;
    }

    static async getUserProfile(token: string): Promise<IProfile> {
        const url = 'https://api.twitter.com/2/users/me';
        const response = await axios(url, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        return data;
    }

    static async searchTweets(token: string, query: QueryString.ParsedQs): Promise<ILiked> {
        const url = `https://api.twitter.com/2/tweets/search/recent?${new URLSearchParams(query as any).toString()}`;
        const response = await axios(url, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        return data;
    }
    static async getUserBookmarks(userID: string, token: string): Promise<ILiked> {
        const url = `https://api.twitter.com/2/users/${userID}/bookmarks`;
        const response = await axios(url, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        return data;
    }
}
