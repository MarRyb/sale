import * as tslib_1 from "tslib";
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppModule } from './app.module';
let AppBrowserModule = class AppBrowserModule {
};
AppBrowserModule = tslib_1.__decorate([
    NgModule({
        imports: [
            AppRoutingModule,
            SharedModule,
            AuthModule,
            BrowserAnimationsModule,
            CoreModule,
            BsDatepickerModule.forRoot(),
            AppModule,
            BrowserTransferStateModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppBrowserModule);
export { AppBrowserModule };
//# sourceMappingURL=app.browser.module.js.map