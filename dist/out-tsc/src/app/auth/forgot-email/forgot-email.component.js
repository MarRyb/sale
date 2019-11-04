import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
let ForgotEmailComponent = class ForgotEmailComponent {
    constructor(fb, router, authService) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.emailSend = false;
        this.alive = true;
    }
    ngOnInit() {
        this.createEmailForm();
    }
    createEmailForm() {
        this.emailForm = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            recaptcha: [false, Validators.required]
        });
    }
    onSubmit() {
        const email = this.emailForm.controls.email.value.toString().toLowerCase();
        const keys = Object.keys(this.emailForm.value);
        this.authService.updatePassWithMail(email)
            .pipe(takeWhile(() => this.alive), tap(res => {
            this.emailSend = true;
        }, err => {
            const errors = this.getErrosCode(err.error.error.code) || 'Что-то пошло не так';
            keys.forEach(val => {
                this.pushErrorFor(val, errors);
            });
            this.emailForm.controls.recaptcha.reset();
        }))
            .subscribe();
    }
    pushErrorFor(ctrlName, msg) {
        this.emailForm.controls[ctrlName].setErrors({ msg });
    }
    getErrosCode(error) {
        switch (error) {
            case 400:
                return 'Пользователь с таким email адресом не зарегистрирован';
            case 500:
                return 'Ошибка сервера, попробуйте позже';
            default:
                return 'Что-то пошло не так';
        }
    }
};
ForgotEmailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgot-email',
        templateUrl: './forgot-email.component.html',
        styleUrls: ['./forgot-email.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        Router,
        AuthService])
], ForgotEmailComponent);
export { ForgotEmailComponent };
//# sourceMappingURL=forgot-email.component.js.map