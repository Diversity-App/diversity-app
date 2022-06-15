import supertest from 'supertest';
import request from 'supertest';
import '../mocks';

import app from '../../src/app';

import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const user = {
    id: 10,
};
//
// const data: StatSummary = {
//     items: [],
//     categories: [],
//     total: 0,
//     categoriesRatio: [],
//     tags: [],
//     tagsRatio: [],
// };
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

    describe('get instagram user infos', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/user').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });

        it('should return unauthorize request', async () => {
            const response = await request(app).get('/v1/data/user');
            expect(response.status).toBe(401);
        });
    });

    describe('get instagram user posts', () => {
        it('should successfully return data', async () => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValue(user as any);
            const agent = supertest.agent(app);
            agent.auth('123', { type: 'bearer' });
            const response = await agent.get('/v1/data/posts').set('Authorization', `Bearer 123`);
            expect(response.status).toBe(200);
        });

        it('should return unauthorize request', async () => {
            const response = await request(app).get('/v1/data/posts');
            expect(response.status).toBe(401);
        });
    });
});
