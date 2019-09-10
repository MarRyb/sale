import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
// import { CookieModule } from 'ngx-cookie';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from '../../app-routing.module';

import { RegisterInfoComponent } from './registration/register-info/register-info.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginInlineComponent } from './login-inline/login-inline.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component';
import { ForgotEmailVerifyComponent } from './forgot-email-verify/forgot-email-verify.component';
import { ForgotEmailCodeComponent } from './forgot-email-code/forgot-email-code.component';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { environment } from 'src/environments/environment';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { defineLocale, ruLocale } from 'ngx-bootstrap';
defineLocale('ru', ruLocale);
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot(),
    // CookieModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    HttpClientModule,
    NgxfUploaderModule,
    AppRoutingModule,
    RecaptchaModule.forRoot({
        siteKey: environment.recaptcha_key,
    }),
  ],
  declarations: [
    RegistrationComponent,
    LoginInlineComponent,
    RegisterInfoComponent,
    LogoutComponent,
    ForgotEmailComponent,
    ForgotEmailVerifyComponent,
    ForgotEmailCodeComponent,
    UpdatePasswordComponent,
  ],
  exports: [
    RegistrationComponent,
    LoginInlineComponent,
    RegisterInfoComponent,
    LogoutComponent,
    UpdatePasswordComponent,
  ]
})
export class AuthModule { }
