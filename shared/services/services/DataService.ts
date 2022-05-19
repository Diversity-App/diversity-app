/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HomepageResponse } from '../models/HomepageResponse';
import type { StatsResponse } from '../models/StatsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DataService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get the stats
     * @returns StatsResponse Successful response
     * @throws ApiError
     */
    public getDataStats(): CancelablePromise<StatsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/stats',
        });
    }

    /**
     * Get the home page
     * @returns HomepageResponse Successful response
     * @throws ApiError
     */
    public getDataHomePage(): CancelablePromise<HomepageResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/homePage',
        });
    }

}