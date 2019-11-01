import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrentUserService } from './../../core/services/current-user.service';
let LoginInlineComponent = class LoginInlineComponent {
    constructor(router, auth, fb, currentUserService, localStorage) {
        this.router = router;
        this.auth = auth;
        this.fb = fb;
        this.currentUserService = currentUserService;
        this.localStorage = localStorage;
        this.errorArray = [];
    }
    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }
    onSubmit() {
        const value = this.loginForm.getRawValue();
        this.auth.authUser(this.createAuthData(value)).subscribe(res => {
            this.localStorage.setItem('auth', JSON.stringify(res));
            this.currentUserService.authenticate();
            this.router.navigate(['/']);
        }, error => {
            this.errorArray = error.error.error.exception;
            return this.errorArray;
        });
    }
    onKeyEnter() {
        if (this.loginForm.valid) {
            this.onSubmit();
        }
    }
    createAuthData(value) {
        return ({
            username: value.email.toLowerCase().replace(/\s/g, ''),
            password: value.password
        });
    }
};
LoginInlineComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login-inline',
        templateUrl: './login-inline.component.html',
        styleUrls: ['./login-inline.component.sass']
    }),
    tslib_1.__param(4, Inject(LOCAL_STORAGE)),
    tslib_1.__metadata("design:paramtypes", [Router,
        AuthService,
        FormBuilder,
        CurrentUserService, Object])
], LoginInlineComponent);
export { LoginInlineComponent };
//# sourceMappingURL=login-inline.component.js.map