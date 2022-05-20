import supertest from 'supertest';

import app from '../src/app';

describe('Server', () => {
    it('should return return OK', (done) => {
        supertest(app)
            .get('/ping')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
