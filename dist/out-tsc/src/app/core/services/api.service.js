import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    get(path, params = {}, withHeaders = false) {
        if (withHeaders) {
            return this.http.get(`${environment.apiUrl}${path}`, { params, observe: 'response' });
        }
        else {
            return this.http.get(`${environment.apiUrl}${path}`, { params });
        }
    }
    patch(path, body = {}, params = {}, withHeaders = false) {
        if (withHeaders) {
            return this.http.patch(`${environment.apiUrl}${path}`, body, { params, observe: 'response' });
        }
        else {
            return this.http.patch(`${environment.apiUrl}${path}`, body, { params });
        }
    }
    post(path, body = {}, params = {}, withHeaders = false) {
        if (withHeaders) {
            return this.http.post(`${environment.apiUrl}${path}`, body, { params, observe: 'response' });
        }
        else {
            return this.http.post(`${environment.apiUrl}${path}`, body, { params });
        }
    }
};
ApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map