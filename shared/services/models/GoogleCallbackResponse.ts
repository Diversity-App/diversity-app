/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiResponse } from './ApiResponse';

export type GoogleCallbackResponse = (ApiResponse & {
    token?: string;
});
