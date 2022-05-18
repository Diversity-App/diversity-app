import { checkPassword, generateToken, hashPassword } from '../../tools/auth.tools';
import { NextFunction, Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../../../../shared/services';

const prisma = new PrismaClient();

export default class AuthController {
    static async register(req: Request<RegisterRequest>, res: Response<RegisterResponse>, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const user = await prisma.users.create({
                data: {
                    username,
                    password: hashPassword(password),
                },
            });
            const token = generateToken({ id: user.id });

            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: {
                    token,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request<LoginRequest>, res: Response<LoginResponse>, next: NextFunction) {
        try {
            const { username, password } = req.body;

            // const query = `SELECT * FROM "Users" WHERE username = $1;`;
            //
            // const [user] = (await Pool.query(query, [username])).rows;
            const user = await prisma.users.findFirst({
                where: {
                    username,
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (!checkPassword(password, user.password)) {
                throw new Error('Invalid password');
            }

            const token = generateToken({ id: user.id });

            res.status(200)
                .cookie('API_TOKEN', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                })
                .json({
                    status: 'success',
                    message: 'User logged in successfully',
                    data: {
                        token,
                    },
                });
        } catch (e) {
            next(e);
        }
    }
}
