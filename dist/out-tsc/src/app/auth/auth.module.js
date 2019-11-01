import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RegisterInfoComponent } from './registration/register-info/register-info.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginInlineComponent } from './login-inline/login-inline.component';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component';
import { ForgotEmailVerifyComponent } from './forgot-email-verify/forgot-email-verify.component';
import { ForgotEmailCodeComponent } from './forgot-email-code/forgot-email-code.component';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { environment } from 'src/environments/environment';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { defineLocale, ruLocale } from 'ngx-bootstrap';
import { AuthRoutingModule } from './auth-router.module';
import { RouterModule } from '@angular/router';
defineLocale('ru', ruLocale);
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            BsDatepickerModule.forRoot(),
            HttpClientModule,
            NgxfUploaderModule,
            RecaptchaModule.forRoot({
                siteKey: environment.recaptcha_key,
            }),
            AuthRoutingModule,
            RouterModule
        ],
        declarations: [
            RegistrationComponent,
            LoginInlineComponent,
            RegisterInfoComponent,
            ForgotEmailComponent,
            ForgotEmailVerifyComponent,
            ForgotEmailCodeComponent,
            UpdatePasswordComponent,
        ],
        exports: [
            RegistrationComponent,
            LoginInlineComponent,
            RegisterInfoComponent,
            UpdatePasswordComponent,
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map