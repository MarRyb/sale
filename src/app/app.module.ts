import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { VP_MEDIA_BREAKPOINTS, VP_WINDOW } from './admin/theme/theme.options';
import { DEFAULT_MEDIA_BREAKPOINTS } from './admin/theme/service/breakpoints.service';
import localeRu from '@angular/common/locales/ru'

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule
  ],
  providers: [
    { provide: VP_MEDIA_BREAKPOINTS, useValue: DEFAULT_MEDIA_BREAKPOINTS },
    { provide: VP_WINDOW, useFactory: () => window },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
