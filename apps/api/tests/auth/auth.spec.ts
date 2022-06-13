import supertest from 'supertest';
import '../mocks';
import { checkPassword } from '../../src/tools/auth.tools';
import { LoginRequest, RegisterRequest } from '../../../../shared/services';

import app from '../../src/app';

import prisma from '../../src/tools/prisma';

jest.mock('../../src/tools/auth.tools');

describe('Auth', () => {
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
