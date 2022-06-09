import { SSOController, SSOTools, Token, User } from '../../../../types.d';
import { Request, Response } from 'express';
import SsoTool from '../../../../tools/sso.tool';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default class InstagramController implements SSOController, SSOTools {
    private static clientId: string = process.env.INSTAGRAM_CLIENT_ID || '';
    private static clientSecret: string = process.env.INSTAGRAM_CLIENT_SECRET || '';
    private static callbackUrl: string = process.env.INSTAGRAM_CALLBACK_URL || '';
    private static redirectUrl: string = process.env.INSTAGRAM_REDIRECT_URL || '';
    private static scope: string = process.env.INSTAGRAM_SCOPE || '';
    private static state: string = process.env.INSTAGRAM_STATE || '';

    public static async getCode(req: Request, res: Response): Promise<void> {
        try {
            const params = {
                client_id: InstagramController.clientId,
                redirect_uri: InstagramController.redirectUrl,
                scope: InstagramController.scope,
                state: InstagramController.state,
                response_type: 'code',
            };
            const url = `https://www.instagram.com/oauth/authorize?${new URLSearchParams(params).toString()}`;
            res.redirect(url);
            console.log(res);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                status: 'error',
                error: 'Internal server error',
            });
        }
    }

    public static async getToken(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.query;
            if (!code || typeof code !== 'string') {
                res.status(400).send({
                    status: 'error',
                    error: 'Bad request',
                });
                return;
            }

            const { user } = req.session;
            if (!user) {
                res.status(401).send({
                    status: 'error',
                    error: 'Unauthorized',
                });
                return;
            }
            const token = await InstagramController.fetchToken(code);
            console.log(token);

            const providerUser = await InstagramController.fetchUser(token.access_token);
            console.log(providerUser);

            await SsoTool.syncUserToken(user.id, providerUser.sub, 'Instagram', token);

            res.json({
                status: 'success',
                token: token.access_token,
            });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                status: 'error',
                error: 'Internal server error',
            });
        }
    }

    private static async fetchUser(token: string): Promise<User & any> {
        const params = {
            fields: 'id,username',
            access_token: token,
        };

        const res = await axios(`https://graph.instagram.com/me?${new URLSearchParams(params).toString()}`, {});
        return await res.data;
    }

    private static async fetchToken(code: string): Promise<Token & any> {
        const res = await axios(`https://api.instagram.com/oauth/access_token`, {
            method: 'POST',
            data: JSON.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: InstagramController.redirectUrl,
                client_id: InstagramController.clientId,
                client_secret: InstagramController.clientSecret,
            }),
        });
        return await res.data;
    }
}
