import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable,  BehaviorSubject,  ReplaySubject, throwError } from 'rxjs';
// import { User } from '../interfaces/user.interface';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public currentUserSubject = new BehaviorSubject({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private apiService: ApiService
  ) { }

  authenticate() {
    return this.apiService.get('api/v1/profile/info').subscribe(
      data => {
        if (data) {
          this.setCurrentUser(data)
        } else {
          this.logout()
        }
      },
      err => this.logout()
    );
  }

  setCurrentUser(user: {}) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

  get() {
    return this.currentUserSubject.value;
  }
}
