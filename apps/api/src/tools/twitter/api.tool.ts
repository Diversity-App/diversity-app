import axios from 'axios';
import { ILiked } from './types';

export default class TwitterApiWrapper {
    static async getUserLikedTweets(userID: string, token: string): Promise<ILiked> {
        console.log(userID, token);
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

/*
   const sqlResponse = await getAccessToken(req, "twitter");
    // const { userId } = req.query;

    if (!sqlResponse.query) return res.status(500).json({ code: sqlResponse.code, error: sqlResponse.error });
    // if (!userId) return res.status(500).json({ code: 500, error: "Invalid UserID" });

    try {
      const url = `https://api.twitter.com/2/users/${sqlResponse.account.id}/liked_tweets?expansions=author_id`;
      const response = await axios(url, {
        headers: { Authorization: `Bearer ${sqlResponse.account.token}` },
      });
      res.status(200).json({ code: 200, data: (await response.data.data) ? response.data.data : [] });
    } catch (e) {
      const err = e as AxiosError;
      if (err.response) return res.status(500).json({ code: 500, error: err.response.data.detail });
      res.status(500).json({ code: 500, error: "[TWITTER][/userLikedTweets] failed" });
    }
    */
