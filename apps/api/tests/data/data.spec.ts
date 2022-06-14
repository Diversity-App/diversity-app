import supertest from 'supertest';
import '../mocks';

import app from '../../src/app';

import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const user = {
    id: 1,
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
    const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1MTQzMjc2LCJleHAiOjE2NTUxODY0NzZ9.xFbq3e0AwRNlULWhtPvOqet2I80qSGrpfI2C1-NDhik';
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
        beforeEach(() => {
            (verify as jest.MockedFunction<typeof verify>).mockReturnValueOnce(user as any);
        });
        afterEach(() => {});
        it('should successfully return data', async () => {
            const agent = supertest.agent(app);
            agent.auth('abc', { type: 'bearer' });
            const response = await agent.get('/v1/data/twitter/liked').set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
        });
    });
});
