import supertest from 'supertest';
import '../mocks';

import app from '../../src/app';

import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const user = {
    id: 6,
};

describe('Data', () => {
    describe('get homepage', () => {
        beforeEach(() => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);
        });
        afterEach(() => {});
        it('should successfully return data', async () => {
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/homePage').set('Authorization', 'Bearer 123');

            expect(response.status).toBe(401);
        });
    });

    describe('get liked tweets', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/twitter/liked').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });
    });

    describe('get twitter profile', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/twitter/profile').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });
    });

    describe('sarch tweets', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/twitter/search?query=%23starcitizen').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });
    });

    describe('get my bookmarks', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/twitter/bookmarks').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });
    });
});
