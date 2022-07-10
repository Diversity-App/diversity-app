import { SSOController, SSOTools } from '../../../../types.d';
import { NextFunction, Request, Response } from 'express';
import SsoTool from '../../../../tools/sso.tool';

import InstagramService from './instagram.service';
import { InstagramCallbackResponse } from '../../../../../../../shared/services';
import { ApiError } from '../../../../types';

export default class InstagramController implements SSOController, SSOTools {
    public static async getCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const params = {
                client_id: InstagramService.clientId,
                redirect_uri: InstagramService.redirectUrl,
                scope: InstagramService.scope,
                state: InstagramService.state,
                response_type: 'code',
            };
            const url = `https://www.instagram.com/oauth/authorize?${new URLSearchParams(params).toString()}`;
            res.redirect(url);
        } catch (e) {
            next(e);
        }
    }

    public static async getToken(
        req: Request<{ code: string }>,
        res: Response<InstagramCallbackResponse>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { code } = req.query;
            if (!code || typeof code !== 'string') {
                // res.status(400).send({
                //     status: 'error',
                //     error: 'Bad request',
                // });
                throw new ApiError(400, 'Bad request');
            }

            const { user } = req;
            if (!user) {
                // res.status(401).send({
                //     status: 'error',
                //     error: 'Unauthorized',
                // });
                // return;
                throw new ApiError(401, 'Unauthorized');
            }
            const token = await InstagramService.fetchToken(code);

            const providerUser = await InstagramService.fetchUser(token.access_token);

            await SsoTool.syncUserToken(user.id, providerUser.id, 'Instagram', token);

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
