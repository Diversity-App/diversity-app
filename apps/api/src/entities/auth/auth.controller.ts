import { checkPassword, generateToken, hashPassword } from '../../tools/auth.tools';
import { NextFunction, Request, Response } from 'express';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../../../../shared/services';
import { ApiError } from '../../types';

import prisma from '../../tools/prisma';

export default class AuthController {
    static async register(req: Request<RegisterRequest>, res: Response<RegisterResponse>, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const user = await prisma.users.create({
                data: {
                    username,
                    password: hashPassword(password),
                },
                select: {
                    id: true,
                },
            });
            console.log(user);
            const token = generateToken({ id: user.id });

            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: {
                    token,
                },
            });
        } catch (e) {
            if (e.code === 'P2002') {
                next(new ApiError(400, 'Username already exists'));
            } else next(e);
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

            console.log(user);
            if (!user) {
                throw new ApiError(401, 'Invalid credentials');
            }

            if (!checkPassword(password, user.password)) {
                throw new ApiError(401, 'Invalid credentials');
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
