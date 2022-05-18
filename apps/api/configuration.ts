import dotenv from 'dotenv';

dotenv.config();

export default {
    OPENAPI_SPEC_DEFINITION: process.env.OPENAPI_SPEC_DEFINITION ?? '../../../shared/generated/openapi-v1.json',
};
