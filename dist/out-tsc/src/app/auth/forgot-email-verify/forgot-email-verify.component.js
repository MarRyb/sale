import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
let ForgotEmailVerifyComponent = class ForgotEmailVerifyComponent {
    constructor(fb, route, router, authService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.authService = authService;
    }
    ngOnInit() {
        this.phoneForm = this.fb.group({
            countryCode: ['38'],
            phoneNumber: ['', Validators.required],
        });
    }
    onSubmit() {
        const phoneNumber = this.phoneForm.get('countryCode').value + this.phoneForm.get('phoneNumber').value;
        const token = this.route.snapshot.queryParamMap.get('token');
        this.authService.sendPasswordAfterEmailVerify(token, phoneNumber).subscribe(() => {
            this.router.navigate(['/', 'forgot-email', 'code'], {
                queryParams: {
                    phone: phoneNumber
                }
            });
        });
    }
};
ForgotEmailVerifyComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgot-email-verify',
        templateUrl: './forgot-email-verify.component.html',
        styleUrls: ['./forgot-email-verify.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        AuthService])
], ForgotEmailVerifyComponent);
export { ForgotEmailVerifyComponent };
//# sourceMappingURL=forgot-email-verify.component.js.map