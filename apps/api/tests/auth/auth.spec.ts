import supertest from 'supertest';
import '../mocks';
import { checkPassword } from '../../src/tools/auth.tools';
import { LoginRequest, RegisterRequest } from '../../../../shared/services';
import { verify } from 'jsonwebtoken';

import app from '../../src/app';

import prisma from '../../src/tools/prisma';
import InstagramService from '../../src/entities/auth/sso/instagram/instagram.service';
import SsoTool from '../../src/tools/sso.tool';

const user = {
    id: 10,
};

jest.mock('../../src/tools/auth.tools');

jest.mock('../../src/tools/auth.tools');
jest.mock('../../src/entities/auth/sso/google/google.service');
jest.mock('../../src/tools/sso.tool');

describe('Auth Basic', () => {
    const expectedUser = {
        id: 1,
        uuid: 'any-uuid',
        created_at: new Date(),
        updated_at: new Date(),
        username: 'admin',
        password: '123456',
    };
    describe('register', () => {
        beforeEach(() => {
            (prisma.users.create as any).mockResolvedValue(expectedUser as any);
        });
        afterEach(() => {
            (prisma.users.findFirst as any).mockReset();
        });
        it('should be a successful register', async () => {
            const registerRequest: RegisterRequest = {
                password: '123456',
                username: 'admin',
            };

            const response = await supertest(app).post('/v1/auth/register').send(registerRequest);
            expect(response.status).toBe(201);
        });
    });

    describe('login', () => {
        beforeEach(() => {
            (prisma.users.findFirst as any).mockResolvedValue(expectedUser as any);
        });
        afterEach(() => {
            (prisma.users.findFirst as any).mockReset();
        });
        it('should be successful connection', async () => {
            (checkPassword as jest.MockedFunction<typeof checkPassword>).mockReturnValueOnce(true);
            const loginReq: LoginRequest = {
                password: '123456',
                username: 'admin',
            };

            const response = await supertest(app).post('/v1/auth/login').send(loginReq);
            expect(response.status).toBe(200);
        });
    });
});

describe('Auth SSO', () => {
    describe('Instagram', () => {
        it('should successfully redirect', async () => {
            const response = await supertest(app).get('/v1/auth/sso/instagram/login');
            // should redirect to consent screen
            expect(response.status).toBe(302);
        });

        // it('should successfully link', async () => {
        //     // Mock JWT validation
        //     (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

        //     const agent = supertest.agent(app);
        //     agent.auth('123', { type: 'bearer' });

        //     // InstagramService
        //     (InstagramService.fetchToken as jest.MockedFunction<typeof InstagramService.fetchToken>).mockResolvedValueOnce({
        //         access_token: 'access_token',
        //         token_type: 'bearer',
        //         expires_in: '3600',
        //     });

        //     (InstagramService.fetchUser as jest.MockedFunction<typeof InstagramService.fetchUser>).mockResolvedValueOnce({
        //         id: 'number',
        //         uuid: 'string',
        //         name: 'string',
        //         username: 'string',
        //     });

        //     // SsoTool
        //     (SsoTool.syncUserToken as jest.MockedFunction<typeof SsoTool.syncUserToken>).mockResolvedValueOnce();

        //     const response = await agent
        //         .get('/v1/auth/sso/instagram/callback?code=' + 'templated-value')
        //         .set('Authorization', 'Bearer 123');

        //     expect(response.status).toBe(200);
        //     expect(response.body).toEqual({
        //         message: 'Authentication successful',
        //         status: 'success',
        //         token: response.body.token,
        //     });
        // });

        // it('should fail to link without credentials', async () => {
        //     // Mock JWT validation
        //     // (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

        //     const agent = supertest.agent(app);
        //     agent.auth('123', { type: 'bearer' });

        //     const response = await agent
        //         .get('/v1/auth/sso/instagram/callback?code=' + 'templated-value')
        //         .set('Authorization', 'Bearer 123');

        //     expect(response.status).toBe(401);
        //     expect(response.body).toHaveProperty('status');
        //     expect(response.body.status).toEqual('error');
        // });

        // it('should fail to link with third party error', async () => {
        //     // Mock JWT validation
        //     // (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

        //     const agent = supertest.agent(app);
        //     agent.auth('123', { type: 'bearer' });

        //     const response = await agent
        //         .get('/v1/auth/sso/instagram/callback?code=' + 'templated-value')
        //         .set('Authorization', 'Bearer 123');

        //     expect(response.status).toBe(500);
        //     expect(response.body).toHaveProperty('status');
        //     expect(response.body.status).toEqual('error');
        // });

        // it('should fail to link caused by duplicate user', async () => {
        //     (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

        //     const agent = supertest.agent(app);
        //     agent.auth('123', { type: 'bearer' });

        //     // InstagramService
        //     (InstagramService.fetchToken as jest.MockedFunction<typeof InstagramService.fetchToken>).mockResolvedValueOnce({
        //         access_token: 'access_token',
        //         token_type: 'bearer',
        //         expires_in: '3600',
        //     });

        //     (InstagramService.fetchUser as jest.MockedFunction<typeof InstagramService.fetchUser>).mockResolvedValueOnce({
        //         id: 'number',
        //         uuid: 'string',
        //         name: 'string',
        //         username: 'string',
        //     });

        //     // SsoTool
        //     (SsoTool.syncUserToken as jest.MockedFunction<typeof SsoTool.syncUserToken>).mockImplementationOnce(() => {
        //         throw new Error('Duplicate user');
        //     });

        //     const response = await agent
        //         .get('/v1/auth/sso/instagram/callback?code=' + 'templated-value')
        //         .set('Authorization', 'Bearer 123');

        //     expect(response.status).toBe(200);
        //     expect(response.body).toHaveProperty('status');
        //     expect(response.body.status).toEqual('error');
        // });
    });
});
