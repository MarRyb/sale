import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { WINDOW } from '@ng-toolkit/universal';

// import { AuthChatUser } from 'src/app/components/chat/models/chat-auth-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    chatURL = environment.chatURL;
    openApiUrl = environment.openApiURL;
    client_id = environment.client_id;
    client_secret = environment.client_secret;

    constructor(@Inject(WINDOW) private window: Window,
                private http: HttpClient,
                private api: ApiService
    ) {
    }

    authUser(data: { username: any; password: any; }): Observable<any> {
        const param = { ...data, guid: this.guid(), client_id: this.client_id, client_secret: this.client_secret, grant_type: 'password'};
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

    forgetPassWithMail(email: any) {
        return this.http.post(`${this.openApiUrl}users/send_password_email`, {
            email,
            url: `${location.origin}/forgot-email/verify/`
        });
    }

    updatePassWithMail(email: string): Observable<any> {
        return this.http.post(`${this.openApiUrl}users/send_invite_email`, {
            email,
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

    registerUser(data: any) {
        return this.api.post('open_api/v1/registration', data);
    }
}

