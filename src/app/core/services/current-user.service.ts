import { ApiAuthService } from './../../auth/service/apiAuth.service';
import { Injectable, Inject } from '@angular/core';
import { Observable,  BehaviorSubject,  ReplaySubject, throwError } from 'rxjs';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public currentUserSubject = new BehaviorSubject({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private apiService: ApiAuthService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

  authenticate() {
    const accessToken = JSON.parse(this.localStorage.getItem('auth'));

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
      this.logout(false);
    }
  }

  setCurrentUser(user: {}) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(toNavigate: boolean = true) {
    this.localStorage.removeItem('auth');
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
    if (toNavigate === true) {
      this.router.navigate(['/signin']);
    }
  }

  get() {
    return this.currentUserSubject.value;
  }
}
