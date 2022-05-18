import { Token } from '../types.d';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class SsoTool {
    static async findUser(client_id: string, provider: string) {
        // const query = `
        //     SELECT
        //         uuid, username
        //     FROM
        //         "Users"
        //     WHERE id IN (
        //         SELECT
        //             user_id
        //         FROM
        //             "SSO_Tokens"
        //         WHERE client_id = $1 AND provider_id IN (
        //             SELECT
        //                 id
        //             FROM
        //                 "SSO_Providers"
        //             WHERE name = $2
        //         )
        //         )`;
        // const [user] = (await Pool.query(query, [client_id, provider])).rows;
        //
        //

        return await prisma.users.findFirst({
            where: {
                AND: [
                    {
                        SSO_Tokens: {
                            some: {
                                client_id,
                            },
                        },
                    },
                    {
                        SSO_Tokens: {
                            some: {
                                SSO_Providers: {
                                    name: provider,
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    static async syncUserToken(userId: number, clientId: string, providerName: string, token: Token) {
        const providerId = await prisma.sSO_Providers.findFirst({
            where: {
                name: providerName,
            },
            select: {
                id: true,
            },
        });

        await prisma.sSO_Tokens.upsert({
            where: {
                provider_id_user_id: {
                    user_id: userId,
                    provider_id: providerId.id,
                },
            },
            create: {
                Users: {
                    connect: {
                        id: userId,
                    },
                },
                client_id: clientId,
                SSO_Providers: {
                    connect: {
                        name: providerName,
                    },
                },
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                expires_in: token.expires_in,
            },
            update: {
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                expires_in: token.expires_in,
                updated_at: new Date(),
            },
        });
    }

    static async getProviderToken(userId: number, provider: string) {
        return await prisma.sSO_Tokens.findFirst({
            where: {
                user_id: userId,
                SSO_Providers: {
                    name: provider,
                },
            },
            select: {
                access_token: true,
                refresh_token: true,
                expires_in: true,
            },
        });
    }
}
