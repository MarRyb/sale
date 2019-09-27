import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})

export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: ''
    };

    const accessToken = this.localStorage.getItem('auth');

    if (accessToken) {
      headersConfig.authorization = 'Bearer ' + JSON.parse(accessToken).access_token;
    }

    const request = req.clone({
      setHeaders: headersConfig,
      withCredentials: false
    });

    return next.handle(request);
  }
}
