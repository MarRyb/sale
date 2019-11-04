import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
let CoreModule = class CoreModule {
};
CoreModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule
        ],
        providers: [
            HttpClientModule,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpConfigInterceptor,
                multi: true
            }
        ]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map