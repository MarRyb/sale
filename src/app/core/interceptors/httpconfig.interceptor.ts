import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    };

    const accessToken = localStorage.getItem('auth');

    if (accessToken) {
      headersConfig.Authorization = 'Bearer ' + JSON.parse(accessToken).access_token;
    }

    const request = req.clone({
      setHeaders: headersConfig,
      withCredentials: false
    });

    return next.handle(request);
  }
}
