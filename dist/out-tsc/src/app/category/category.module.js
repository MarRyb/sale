import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryHeaderComponent } from './header/header.component';
import { CategoryRoutingModule } from './category-routing.module';
import { AuthModule } from '../auth/auth.module';
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    NgModule({
        declarations: [CategoryHeaderComponent],
        imports: [
            CommonModule,
            CategoryRoutingModule,
            AuthModule
        ]
    })
], CategoryModule);
export { CategoryModule };
//# sourceMappingURL=category.module.js.map