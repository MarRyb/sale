import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoModule } from './header/logo/logo.module';
import { UiElementModule } from './../__ui-element/ui-element.module';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { ShowAuthedDirective } from './../directives/show-authed.directive';
import { RouterModule } from '@angular/router';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            HeaderComponent,
            FooterComponent,
            ClickOutsideDirective,
            ShowAuthedDirective
        ],
        imports: [
            CommonModule,
            LogoModule,
            UiElementModule,
            RouterModule
        ],
        exports: [
            HeaderComponent,
            FooterComponent,
            ShowAuthedDirective
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map