/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiResponse } from './ApiResponse';

export type InstagramCallbackResponse = (ApiResponse & {
    token?: string;
});
