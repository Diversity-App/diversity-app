import { SSOController, SSOTools } from '../../../../types.d';
import { NextFunction, Request, Response } from 'express';
import SsoTool from '../../../../tools/sso.tool';

import TwitterService from './twitter.service';
import { GoogleCallbackResponse } from '../../../../../../../shared/services';
import { ApiError } from '../../../../types';

export default class TwitterController implements SSOController, SSOTools {
    public static async getCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const params = {
                client_id: TwitterService.clientId,
                redirect_uri: TwitterService.redirectUrl,
                scope: TwitterService.scope,
                state: TwitterService.state,
                response_type: 'code',
                code_challenge: 'challenge',
                code_challenge_method: 'plain',
            };
            const url = `https://twitter.com/i/oauth2/authorize?${new URLSearchParams(params).toString()}`;
            res.redirect(url);
        } catch (e) {
            next(e);
        }
    }

    public static async getToken(
        req: Request<{ code: string }>,
        res: Response<GoogleCallbackResponse>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { code } = req.query;
            if (!code || typeof code !== 'string') throw new ApiError(400, 'Bad request');
            const { user } = req;
            if (!user) throw new ApiError(401, 'Unauthorized');
            console.log(user);
            const token = await TwitterService.fetchToken(code);
            console.log(token);
            const { data } = await TwitterService.fetchUser(token.access_token);
            console.log(data);
            await SsoTool.syncUserToken(user.id, data.id, 'Twitter', token);
            res.json({
                message: 'Authentication successful',
                status: 'success',
                token: token.access_token,
            });
        } catch (e) {
            next(e);
        }
    }
}
