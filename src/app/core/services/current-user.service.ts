import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable,  BehaviorSubject,  ReplaySubject, throwError } from 'rxjs';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public currentUserSubject = new BehaviorSubject({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  authenticate() {
    const accessToken = JSON.parse(localStorage.getItem('auth'));

    if (accessToken && accessToken.access_token) {
      return this.apiService.get('api/v1/profile/info').subscribe(
        data => {
          if (data) {
            this.setCurrentUser(data);
          } else {
            this.logout();
          }
        },
        err => this.logout()
      );
    } else {
      this.logout();
    }
  }

  setCurrentUser(user: {}) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/signin']);
  }

  get() {
    return this.currentUserSubject.value;
  }
}
