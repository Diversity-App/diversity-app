/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiResponse } from './ApiResponse';
import type { StatSummary } from './StatSummary';

export type HomepageResponse = (ApiResponse & {
    data: StatSummary;
});
