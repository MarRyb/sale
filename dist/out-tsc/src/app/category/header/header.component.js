import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CategoryService } from './../../core/services/category.service';
let CategoryHeaderComponent = class CategoryHeaderComponent {
    constructor(category) {
        this.category = category;
    }
    ngOnInit() {
        this.category.getList().subscribe((response) => {
            console.log(response);
        });
    }
};
CategoryHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-category-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [CategoryService])
], CategoryHeaderComponent);
export { CategoryHeaderComponent };
//# sourceMappingURL=header.component.js.map