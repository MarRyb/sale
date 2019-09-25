import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(
    private http: HttpClient
  ) {}

  get(path: string, params = {}, withHeaders: boolean = false): Observable<any> {
    if (withHeaders) {
      return this.http.get<any>(`${environment.apiAuth}${path}`, { params, observe: 'response' });
    } else {
      return this.http.get<any>(`${environment.apiAuth}${path}`, { params });
    }
  }

  post(path: string, body = {}, params = {}, withHeaders: boolean = false): Observable<any> {
    if (withHeaders) {
      return this.http.post<any>(`${environment.apiAuth}${path}`, body, { params, observe: 'response' });
    } else {
      return this.http.post<any>(`${environment.apiAuth}${path}`, body, { params });
    }
  }

}
