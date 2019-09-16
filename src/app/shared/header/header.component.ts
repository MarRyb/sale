import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './../../core/services/current-user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit() {
  }

}
