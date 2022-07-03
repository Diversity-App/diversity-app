import { NextFunction, Request, Response } from 'express';
import SsoTool from '../../tools/sso.tool';
import { Token } from '../../types.d';
import YoutubeApiWrapper from '../../tools/youtube/api.tool';
import YoutubeStatsTool from '../../tools/youtube/stats.tool';
import StatsTool from '../../tools/stats.tool';
import { HomepageResponse, StatsResponse } from '../../../../../shared/services';
import { ApiError } from '../../types';
import InstagramApiWrapper from '../../tools/instagram/api.tool';

export default class DataController {
    static async getStats(req: Request, res: Response<StatsResponse>, next: NextFunction) {
        //get id from params
        try {
            const { user } = req;

            const youtubeToken: Token = await SsoTool.getProviderToken(user.id, 'Google');
            if (!youtubeToken) {
                throw new ApiError(401, 'You must be logged in to access this page');
            }
            const stats = [
                YoutubeApiWrapper.getLikedPlaylist(youtubeToken.access_token),
                YoutubeApiWrapper.getUserHomepage(youtubeToken.access_token),
            ];
            const parsedStats = (await Promise.all(stats))
                .map(YoutubeStatsTool.parsePlaylistStats)
                .map(StatsTool.summarize);

            const summary = StatsTool.aggregate(parsedStats);

            res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data',
                data: summary,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getHomePage(req: Request, res: Response<HomepageResponse>, next: NextFunction) {
        try {
            const { user } = req;

            const youtubeToken: Token = await SsoTool.getProviderToken(user.id, 'Google');
            if (!youtubeToken) {
                throw new ApiError(401, 'You must be logged in to access this page');
            }

            const data = await YoutubeApiWrapper.getUserHomepage(youtubeToken.access_token);
            const stats = YoutubeStatsTool.parsePlaylistStats(data);
            const summary = StatsTool.summarize(stats);
            res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data',
                data: summary,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getUserInfos(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req;

            const instagramToken: Token = await SsoTool.getProviderToken(user.id, 'Instagram');

            if (!instagramToken) {
                throw new ApiError(401, 'You must be logged in to access this page');
            }

            const data = await InstagramApiWrapper.UserInfos(instagramToken.access_token);

            res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data',
                data: data,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getUserPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req;

            const instagramToken: Token = await SsoTool.getProviderToken(user.id, 'Instagram');

            if (!instagramToken) {
                throw new ApiError(401, 'You must be logged in to access this page');
            }

            const data = await InstagramApiWrapper.UserPosts(instagramToken.access_token);
            res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data',
                data: data,
            });
        } catch (e) {
            next(e);
        }
    }

    // static async getLikedPlaylists(req: Request, res: Response) {
    //     try {
    //         const { user } = req.session;
    //         if (!user) {
    //             return res.redirect('/auth/login');
    //         }
    //
    //         const youtubeToken: Token = await SsoTool.getProviderToken(user.id, 'Google');
    //         if (!youtubeToken) {
    //             return res.redirect('/auth/sso/google/login');
    //         }
    //         const data = await YoutubeApiWrapper.getLikedPlaylist(youtubeToken.access_token);
    //         const stats = YoutubeStatsTool.parsePlaylistStats(data);
    //         const summary = StatsTool.summarize(stats);
    //         res.status(200).json(summary);
    //     } catch (e) {
    //         console.error(e);
    //         res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    //     }
    // }
}
