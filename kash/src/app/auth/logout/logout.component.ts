import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogoutAction } from '../../../actions/auth.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
  }

  logoutUser() {
    this.store.dispatch(new LogoutAction());
  }

}
