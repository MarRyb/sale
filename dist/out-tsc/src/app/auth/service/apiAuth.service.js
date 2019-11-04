import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
let ApiAuthService = class ApiAuthService {
    constructor(http) {
        this.http = http;
    }
    get(path, params = {}, withHeaders = false) {
        if (withHeaders) {
            return this.http.get(`${environment.apiAuth}${path}`, { params, observe: 'response' });
        }
        else {
            return this.http.get(`${environment.apiAuth}${path}`, { params });
        }
    }
    post(path, body = {}, params = {}, withHeaders = false) {
        if (withHeaders) {
            return this.http.post(`${environment.apiAuth}${path}`, body, { params, observe: 'response' });
        }
        else {
            return this.http.post(`${environment.apiAuth}${path}`, body, { params });
        }
    }
};
ApiAuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ApiAuthService);
export { ApiAuthService };
//# sourceMappingURL=apiAuth.service.js.map