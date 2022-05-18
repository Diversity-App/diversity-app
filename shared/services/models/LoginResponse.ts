/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiResponse } from './ApiResponse';

export type LoginResponse = (ApiResponse & {
    data: {
        token?: string;
    };
});
