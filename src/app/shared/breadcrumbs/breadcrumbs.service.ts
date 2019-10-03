import { Injectable, Inject } from '@angular/core';
import { Observable,  BehaviorSubject,  ReplaySubject, throwError } from 'rxjs';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public breadcrumbsSubject = new BehaviorSubject([]);
  public breadcrumbs = this.breadcrumbsSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
  ) { }
}
