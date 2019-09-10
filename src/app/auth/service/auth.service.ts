// import { AuthLoginService } from './service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
// import { LOGIN_SUCCESS, LoginAction, IPayloadRefreshTokenChat } from '../../../actions/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
// import { AuthChatUser } from 'src/app/components/chat/models/chat-auth-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    chatURL = environment.chatURL;
    openApiUrl = environment.openApiURL;

    constructor(
        private http: HttpClient,
        private store: Store<any>,
        private action$: Actions,
    ) {
    }

    // authUser(data: { userName: any; pass: any; }) {
    //     const param = { ...data, guid: this.guid() };
    //     this.store.dispatch(new LoginAction(param));
    //     return this.action$.pipe(ofType(LOGIN_SUCCESS), take(1));
    // }

    // authChat(data: AuthChatUser): Observable<any> {
    //     return this.http.post(`${this.chatURL}api/v1/auth`, {
    //         email: data.email,
    //         password: data.password,
    //     });
    // }

    // refreshTokenChat(payload: { userId: number, refreshToken: string }): Observable<IPayloadRefreshTokenChat> {
    //     return this.http.post<IPayloadRefreshTokenChat>(`${this.chatURL}api/v1/token`, payload);
    // }

    forgetPassWithMail(email: any) {
        return this.http.post(`${this.openApiUrl}users/send_password_email`, {
            email: email,
            url: `${location.origin}/forgot-email/verify/`
        });
    }

    updatePassWithMail(email: string): Observable<any> {
        return this.http.post(`${this.openApiUrl}users/send_invite_email`, {
            email: email,
            url: `${location.origin}/update-password/`
        });
    }

    sendPasswordAfterEmailVerify(token, phone) {
        return this.http.post(`${environment.URL}users/invite_edit/${token}`, { phone });
    }

    updatePassword(token: string, data: any): Observable<any> {
        return this.http.post(`${this.openApiUrl}users/recovery_password?confirmation_token=${token}`, data);
    }

    guid() {
        const nav = window.navigator;
        const screen = window.screen;
        let guid = nav.mimeTypes.length.toString();
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || 0;
        guid += screen.width || 0;
        guid += screen.pixelDepth || 0;

        return guid;
    }

    registerUser(data) {
        const req = this.openApiUrl + 'registration';
        return this.http.post(req, data)    ;
    }
}

