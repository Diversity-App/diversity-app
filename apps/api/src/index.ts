import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './entities/routes';
import bodyParser from 'body-parser';
import session from 'express-session';
import { User } from './types.d';
import cookieParser from 'cookie-parser';

import configuration from '../configuration';
import * as OpenApiValidator from 'express-openapi-validator';

const openApiDocument = require(configuration.OPENAPI_SPEC_DEFINITION);

const sessionConfig = {
    user: {},
    secret: process.env.COOKIE_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
};
declare module 'express-session' {
    export interface SessionData {
        user: User;
    }
}

declare module 'express' {
    export interface Request {
        user: User;
    }
}

dotenv.config();

const app = express();
app.use(session(sessionConfig));

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(
    OpenApiValidator.middleware({
        apiSpec: openApiDocument,
        validateRequests: {
            removeAdditional: 'all',
            allowUnknownQueryParameters: false,
            coerceTypes: false,
        },
        ignoreUndocumented: true,
        // validateResponses: {
        //     removeAdditional: 'all',
        // },
        validateFormats: 'full',
    }),
);

app.use('/v1/', routes);

// login all requests

app.use((err: any, req: Request, res: Response, $next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
        status: 'failed',
        errors: err.errors,
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
