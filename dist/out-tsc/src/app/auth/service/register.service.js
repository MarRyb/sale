import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
let RegisterService = class RegisterService {
    constructor(localStorage) {
        this.localStorage = localStorage;
    }
    getRegisterStage() {
        return this.localStorage.get('registerStage', 'vpotoke');
    }
    getRegisterId() {
        return this.localStorage.get('id', 'vpotoke');
    }
    setRegisterData(data) {
        this.localStorage.set('id', `${data.id}`, 'vpotoke');
        this.localStorage.set('registerStage', `${data.registerStage}`, 'vpotoke');
    }
    setLogin(login) {
        this.login = login;
        this.localStorage.set('id', login, 'vpotoke');
    }
    getLogin() {
        return this.login;
    }
    setCode(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
};
RegisterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(0, Inject(LOCAL_STORAGE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], RegisterService);
export { RegisterService };
//# sourceMappingURL=register.service.js.map