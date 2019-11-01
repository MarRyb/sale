import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginInlineComponent } from '../auth/login-inline/login-inline.component';
import { UpdatePasswordComponent } from '../auth/update-password/update-password.component';
import { ForgotEmailVerifyComponent } from '../auth/forgot-email-verify/forgot-email-verify.component';
const routes = [
    { path: 'signin', component: LoginInlineComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'forgot-password', component: ForgotEmailComponent },
    { path: 'update-password', component: UpdatePasswordComponent },
    { path: 'forgot-email/verify', component: ForgotEmailVerifyComponent },
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AuthRoutingModule);
export { AuthRoutingModule };
//# sourceMappingURL=auth-router.module.js.map