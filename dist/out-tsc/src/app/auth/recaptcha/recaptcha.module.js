import * as tslib_1 from "tslib";
var RecaptchaModule_1;
import { NgModule } from '@angular/core';
import { RecaptchaComponent } from './recaptcha.component';
const RECAPTCHA_CONFIG = 'google-recaptcha siteKey';
let RecaptchaModule = RecaptchaModule_1 = class RecaptchaModule {
    static forRoot(recaptchaConfig) {
        return {
            ngModule: RecaptchaModule_1,
            providers: [{ provide: RECAPTCHA_CONFIG, useValue: recaptchaConfig }],
        };
    }
};
RecaptchaModule = RecaptchaModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [RecaptchaComponent],
        exports: [RecaptchaComponent],
    })
], RecaptchaModule);
export { RecaptchaModule };
//# sourceMappingURL=recaptcha.module.js.map