import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { LogoImgComponent } from './logo-img/logo-img.component';
import { RouterModule } from '@angular/router';
let LogoModule = class LogoModule {
};
LogoModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LogoComponent,
            LogoImgComponent
        ],
        exports: [
            LogoComponent
        ],
        imports: [
            CommonModule,
            RouterModule
        ]
    })
], LogoModule);
export { LogoModule };
//# sourceMappingURL=logo.module.js.map