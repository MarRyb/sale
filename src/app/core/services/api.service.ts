import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  get(path: string, params = {}, withHeaders: boolean = false): Observable<any> {
    if (withHeaders) {
      return this.http.get<any>(`${environment.apiUrl}${path}`, { params, observe: 'response' });
    } else {
      return this.http.get<any>(`${environment.apiUrl}${path}`, { params });
    }
  }

  patch(path: string, body = {}, params = {}, withHeaders: boolean = false): Observable<any> {
    if (withHeaders) {
      return this.http.patch<any>(`${environment.apiUrl}${path}`, body, { params, observe: 'response' });
    } else {
      return this.http.patch<any>(`${environment.apiUrl}${path}`, body, { params });
    }
  }

  post(path: string, body = {}, params = {}, withHeaders: boolean = false): Observable<any> {
    if (withHeaders) {
      return this.http.post<any>(`${environment.apiUrl}${path}`, body, { params, observe: 'response' });
    } else {
      return this.http.post<any>(`${environment.apiUrl}${path}`, body, { params });
    }
  }

}
