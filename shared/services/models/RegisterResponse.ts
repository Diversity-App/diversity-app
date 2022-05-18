/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiResponse } from './ApiResponse';

export type RegisterResponse = (ApiResponse & {
    data: {
        token: string;
    };
});
