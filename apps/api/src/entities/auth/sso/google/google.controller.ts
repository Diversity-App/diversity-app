import { SSOController, SSOTools } from '../../../../types.d';
import { NextFunction, Request, Response } from 'express';
import SsoTool from '../../../../tools/sso.tool';

import GoogleService from './google.service';
import { GoogleCallbackResponse } from '../../../../../../../shared/services';
import { ApiError } from '../../../../types';

export default class GoogleController implements SSOController, SSOTools {
    public static async getCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const params = {
                client_id: GoogleService.clientId,
                redirect_uri: GoogleService.redirectUrl,
                scope: GoogleService.scope,
                state: GoogleService.state,
                response_type: 'code',
                prompt: 'consent',
            };
            const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(params).toString()}`;
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
            console.log('req.query', req.query);
            const { code } = req.query;
            if (!code || typeof code !== 'string') {
                // res.status(400).send({
                //     status: 'error',
                //     error: 'Bad request',
                // });
                throw new ApiError(400, 'Bad request');
            }

            const { user } = req.session;
            if (!user) {
                // res.status(401).send({
                //     status: 'error',
                //     error: 'Unauthorized',
                // });
                // return;
                throw new ApiError(401, 'Unauthorized');
            }
            const token = await GoogleService.fetchToken(code);
            console.log(token);

            const providerUser = await GoogleService.fetchUser(token.access_token);
            console.log(providerUser);

            await SsoTool.syncUserToken(user.id, providerUser.sub, 'Google', token);

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
