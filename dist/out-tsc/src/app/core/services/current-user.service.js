import * as tslib_1 from "tslib";
import { ApiAuthService } from './../../auth/service/apiAuth.service';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
let CurrentUserService = class CurrentUserService {
    constructor(apiService, router, localStorage) {
        this.apiService = apiService;
        this.router = router;
        this.localStorage = localStorage;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    authenticate() {
        const accessToken = JSON.parse(this.localStorage.getItem('auth'));
        if (accessToken && accessToken.access_token) {
            return this.apiService.get('api/v1/profile/info').subscribe(data => {
                if (data) {
                    this.setCurrentUser(data);
                }
                else {
                    this.logout();
                }
            }, err => this.logout());
        }
        else {
            this.logout();
        }
    }
    setCurrentUser(user) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }
    logout() {
        this.localStorage.removeItem('auth');
        this.currentUserSubject.next({});
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/category']);
    }
    get() {
        return this.currentUserSubject.value;
    }
};
CurrentUserService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(2, Inject(LOCAL_STORAGE)),
    tslib_1.__metadata("design:paramtypes", [ApiAuthService,
        Router, Object])
], CurrentUserService);
export { CurrentUserService };
//# sourceMappingURL=current-user.service.js.map