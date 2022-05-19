import dotenv from 'dotenv';

dotenv.config();

export default {
    OPENAPI_SPEC_DEFINITION: process.env.OPENAPI_SPEC_DEFINITION ?? '../../../shared/generated/openapi-v1.json',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ?? '',
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL ?? '',
    GOOGLE_SCOPE: process.env.GOOGLE_SCOPE ?? '',
    GOOGLE_STATE: process.env.GOOGLE_STATE ?? '',
};
