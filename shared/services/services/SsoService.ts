/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoogleCallbackResponse } from '../models/GoogleCallbackResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SsoService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get the login page
     * @returns void
     * @throws ApiError
     */
    public getAuthSsoGoogleLogin(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/google/login',
            errors: {
                302: `Redirect to login page`,
            },
        });
    }

    /**
     * Consent screen callback, returns token
     * @param code Authorization code
     * @returns GoogleCallbackResponse Redirect to login page
     * @throws ApiError
     */
    public getAuthSsoGoogleCallback(
        code: string,
    ): CancelablePromise<GoogleCallbackResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/google/callback',
            query: {
                'code': code,
            },
        });
    }

}