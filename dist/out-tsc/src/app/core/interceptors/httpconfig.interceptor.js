import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
let HttpConfigInterceptor = class HttpConfigInterceptor {
    constructor(localStorage) {
        this.localStorage = localStorage;
    }
    intercept(req, next) {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        };
        const accessToken = this.localStorage.getItem('auth');
        if (accessToken) {
            headersConfig.Authorization = 'Bearer ' + JSON.parse(accessToken).access_token;
        }
        const request = req.clone({
            setHeaders: headersConfig,
            withCredentials: false
        });
        return next.handle(request);
    }
};
HttpConfigInterceptor = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(0, Inject(LOCAL_STORAGE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], HttpConfigInterceptor);
export { HttpConfigInterceptor };
//# sourceMappingURL=httpconfig.interceptor.js.map