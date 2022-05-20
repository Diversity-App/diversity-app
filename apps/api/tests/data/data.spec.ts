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
});
