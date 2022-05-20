import supertest from 'supertest';

import { server } from '../src';

describe('Server', () => {
    it('should return return OK', (done) => {
        supertest(server)
            .get('/ping')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
