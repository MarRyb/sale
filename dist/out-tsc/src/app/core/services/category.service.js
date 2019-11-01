import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
let CategoryService = class CategoryService {
    constructor(api) {
        this.api = api;
    }
    getList() {
        return this.api.get('api/v1/static/category/');
    }
};
CategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ApiService])
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map