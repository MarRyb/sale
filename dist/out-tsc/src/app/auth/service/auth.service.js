import * as tslib_1 from "tslib";
import { ApiAuthService } from './apiAuth.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WINDOW } from '@ng-toolkit/universal';
// import { AuthChatUser } from 'src/app/components/chat/models/chat-auth-user';
let AuthService = class AuthService {
    constructor(window, http, api) {
        this.window = window;
        this.http = http;
        this.api = api;
        this.chatURL = environment.chatURL;
        this.openApiUrl = environment.apiAuth;
        this.client_id = environment.client_id;
        this.client_secret = environment.client_secret;
    }
    authUser(data) {
        const param = Object.assign({}, data, { guid: this.guid(), client_id: this.client_id, client_secret: this.client_secret, grant_type: 'password' });
        return this.api.get('oauth/v2/token', param);
    }
    // authChat(data: AuthChatUser): Observable<any> {
    //     return this.http.post(`${this.chatURL}api/v1/auth`, {
    //         email: data.email,
    //         password: data.password,
    //     });
    // }
    // refreshTokenChat(payload: { userId: number, refreshToken: string }): Observable<IPayloadRefreshTokenChat> {
    //     return this.http.post<IPayloadRefreshTokenChat>(`${this.chatURL}api/v1/token`, payload);
    // }
    forgetPassWithMail(email) {
        return this.http.post(`${this.openApiUrl}users/send_password_email`, {
            email,
            url: `${location.origin}/forgot-email/verify/`
        });
    }
    updatePassWithMail(email) {
        return this.http.post(`${this.openApiUrl}users/send_invite_email`, {
            email,
            url: `${location.origin}/update-password/`
        });
    }
    sendPasswordAfterEmailVerify(token, phone) {
        return this.http.post(`${environment.URL}users/invite_edit/${token}`, { phone });
    }
    updatePassword(token, data) {
        return this.http.post(`${this.openApiUrl}users/recovery_password?confirmation_token=${token}`, data);
    }
    guid() {
        const nav = this.window.navigator;
        const screen = this.window.screen;
        let guid = nav.mimeTypes.length.toString();
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || 0;
        guid += screen.width || 0;
        guid += screen.pixelDepth || 0;
        return guid;
    }
    registerUser(data) {
        return this.api.post('open_api/v1/registration', data);
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(0, Inject(WINDOW)),
    tslib_1.__metadata("design:paramtypes", [Window,
        HttpClient,
        ApiAuthService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map