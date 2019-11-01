import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RegisterService } from '../service/register.service';
let ForgotEmailCodeComponent = class ForgotEmailCodeComponent {
    constructor(fb, route, activatedRoute, router, registerService, authService) {
        this.fb = fb;
        this.route = route;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.registerService = registerService;
        this.authService = authService;
    }
    ngOnInit() {
        this.codeForm = this.fb.group({
            code: ['', Validators.compose([Validators.minLength(4), Validators.required])],
        });
        this.activatedRoute.queryParams.subscribe(params => {
            return this.phone = params.phone;
        });
    }
    onSubmit() {
        const code = this.codeForm.get('code').value;
        this.authService.authUser({
            username: this.phone,
            password: code
        }).subscribe(() => this.router.navigate(['editshape']));
    }
};
ForgotEmailCodeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgot-email-code',
        templateUrl: './forgot-email-code.component.html',
        styleUrls: ['./forgot-email-code.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        ActivatedRoute,
        Router,
        RegisterService,
        AuthService])
], ForgotEmailCodeComponent);
export { ForgotEmailCodeComponent };
//# sourceMappingURL=forgot-email-code.component.js.map