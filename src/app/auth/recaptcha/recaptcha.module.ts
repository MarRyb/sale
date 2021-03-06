import { NgModule, ModuleWithProviders } from '@angular/core';
import { RecaptchaComponent } from './recaptcha.component';

export interface RecaptchaModuleConfig {
  siteKey: string;
}
const RECAPTCHA_CONFIG = 'google-recaptcha siteKey';
@NgModule({
  declarations: [RecaptchaComponent],
  exports: [RecaptchaComponent],
})

export class RecaptchaModule {
  static forRoot(recaptchaConfig: RecaptchaModuleConfig): ModuleWithProviders {
    return {
      ngModule: RecaptchaModule,
      providers: [{ provide: RECAPTCHA_CONFIG, useValue: recaptchaConfig }],
    };
  }
}
