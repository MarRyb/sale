import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryHeaderComponent } from './header/header.component';
const routes = [
    { path: '', component: CategoryHeaderComponent },
];
let CategoryRoutingModule = class CategoryRoutingModule {
};
CategoryRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CategoryRoutingModule);
export { CategoryRoutingModule };
//# sourceMappingURL=category-routing.module.js.map