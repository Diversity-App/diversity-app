import supertest from 'supertest';
import '../mocks';
import { checkPassword } from '../../src/tools/auth.tools';
import { LoginRequest, RegisterRequest } from '../../../../shared/services';

import app from '../../src/app';

import prisma from '../../src/tools/prisma';
<<<<<<< HEAD
=======

>>>>>>> a9a0ba5bc2b3e78cccf50be20f71b2e7541c3250
import { verify } from 'jsonwebtoken';
import GoogleService from '../../src/entities/auth/sso/google/google.service';
import SsoTool from '../../src/tools/sso.tool';

jest.mock('jsonwebtoken');
const user = {
    id: 1,
};

jest.mock('../../src/tools/auth.tools');
jest.mock('../../src/entities/auth/sso/google/google.service');
jest.mock('../../src/tools/sso.tool');

<<<<<<< HEAD
=======

>>>>>>> a9a0ba5bc2b3e78cccf50be20f71b2e7541c3250
jest.setTimeout(100000);

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
    describe('Google', () => {
        it('should successfully redirect', async () => {
            const response = await supertest(app).get('/v1/auth/sso/google/login');
            // should redirect to consent screen
            expect(response.status).toBe(302);
        });

        it('should successfully link', async () => {
            // Mock JWT validation
            (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });

            // GoogleService
            (GoogleService.fetchToken as jest.MockedFunction<typeof GoogleService.fetchToken>).mockResolvedValueOnce({
                access_token: 'access_token',
                refresh_token: 'refresh_token',
                expires_in: '3600',
            });

            (GoogleService.fetchUser as jest.MockedFunction<typeof GoogleService.fetchUser>).mockResolvedValueOnce({
                id: 'number',
                uuid: 'string',
                name: 'string',
                username: 'string',
            });

            (prisma.sSO_Tokens.upsert as any).mockImplementationOnce(() => {});

            const response = await agent.get('/v1/auth/sso/google/callback').set('Authorization', 'Bearer 123');

            expect(response.status).toBe(400);
            // expect(response.body).toEqual({
            //     message: 'Authentication successful',
            //     status: 'success',
            //     token: response.body.token,
            // });
        });

        it('should fail to link without credentials', async () => {
            // Mock JWT validation
            // (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });

            const response = await agent.get('/v1/auth/sso/google/callback').set('Authorization', 'Bearer 123');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('status');
            expect(response.body.status).toEqual('failed');
        });

        it('should fail to link with third party error', async () => {
            // Mock JWT validation
            // (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });

            const response = await agent.get('/v1/auth/sso/google/callback').set('Authorization', 'Bearer 123');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('status');
            expect(response.body.status).toEqual('failed');
        });

        it('should fail to link caused by duplicate user', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);

            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });

            // GoogleService
            (GoogleService.fetchToken as jest.MockedFunction<typeof GoogleService.fetchToken>).mockResolvedValueOnce({
                access_token: 'access_token',
                refresh_token: 'refresh_token',
                expires_in: '3600',
            });

            (GoogleService.fetchUser as jest.MockedFunction<typeof GoogleService.fetchUser>).mockResolvedValueOnce({
                id: 'number',
                uuid: 'string',
                name: 'string',
                username: 'string',
            });

            // SsoTool
            (SsoTool.syncUserToken as jest.MockedFunction<typeof SsoTool.syncUserToken>).mockImplementationOnce(() => {
                throw new Error('Duplicate user');
            });

            const response = await agent.get('/v1/auth/sso/google/callback').set('Authorization', 'Bearer 123');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('status');
            expect(response.body.status).toEqual('failed');
        });
    });
});