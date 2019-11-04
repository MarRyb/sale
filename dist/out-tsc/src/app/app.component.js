import * as tslib_1 from "tslib";
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';
let AppComponent = class AppComponent {
    constructor(currentUser, window, 
    // tslint:disable-next-line: ban-types
    platformId) {
        this.currentUser = currentUser;
        this.window = window;
        this.platformId = platformId;
        this.title = 'kash';
        if (isPlatformBrowser(this.platformId)) {
            this.currentUser.authenticate();
        }
    }
    ngOnInit() { }
    onActivate() {
        if (isPlatformBrowser(this.platformId)) {
            this.window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.sass']
    }),
    tslib_1.__param(1, Inject(WINDOW)),
    tslib_1.__param(2, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [CurrentUserService,
        Window,
        Object])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map