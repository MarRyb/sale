import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { tap, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
let UpdatePasswordComponent = class UpdatePasswordComponent {
    constructor(fb, route, router, authService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.passwordReset = false;
        this.alive = true;
        alert(1);
    }
    ngOnInit() {
        this.route.queryParams.pipe(takeWhile(() => this.alive))
            .subscribe(params => {
            this.token = params.token;
        });
        this.initForm();
    }
    ngOnDestroy() {
        this.alive = false;
    }
    onSubmit() {
        const values = this.updatePasswordForm.value;
        const keys = Object.keys(values);
        if (this.updatePasswordForm.valid) {
            this.authService
                .updatePassword(this.token, values)
                .pipe(takeWhile(() => this.alive), tap(res => (this.passwordReset = true), user => {
                const errors = this.getErrosCode(user.error.error.code) || 'Что-то пошло не так';
                keys.forEach(val => {
                    this.pushErrorFor(val, errors);
                });
            }))
                .subscribe();
        }
        else {
            keys.forEach(val => {
                const ctrl = this.updatePasswordForm.controls[val];
                if (!ctrl.valid) {
                    this.pushErrorFor(val, null);
                    ctrl.markAsTouched();
                }
            });
        }
    }
    pushErrorFor(ctrlName, msg) {
        this.updatePasswordForm.controls[ctrlName].setErrors({ msg });
    }
    initForm() {
        const password = '';
        const confirmPassword = '';
        this.updatePasswordForm = this.fb.group({
            password: [
                password,
                Validators.compose([Validators.required, Validators.minLength(6)])
            ],
            confirmPassword: [
                confirmPassword,
                Validators.compose([Validators.required, Validators.minLength(6)])
            ],
        }, { validator: this.matchingPasswords({ passwordKey: 'password', confirmPasswordKey: 'confirmPassword' }) });
    }
    matchingPasswords({ passwordKey, confirmPasswordKey }) {
        return (group) => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }
    getErrosCode(error) {
        switch (error) {
            case 400:
                return 'Время жизни токена истекло, отправте повторный запрос';
            case 500:
                return 'Ошибка сервера, попробуйте позже';
            default:
                return 'Что-то пошло не так';
        }
    }
};
UpdatePasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-update-password',
        templateUrl: './update-password.component.html',
        styleUrls: ['./update-password.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        AuthService])
], UpdatePasswordComponent);
export { UpdatePasswordComponent };
//# sourceMappingURL=update-password.component.js.map