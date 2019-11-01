import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CurrentUserService } from '../../core/services/current-user.service';
let HeaderComponent = class HeaderComponent {
    constructor(currentUserService) {
        this.currentUserService = currentUserService;
    }
    ngOnInit() {
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [CurrentUserService])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map