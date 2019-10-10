import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { CurrentUserService } from '../../core/services/current-user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  showSettings = false;
  constructor(
    public currentUserService: CurrentUserService,
    private route: Router
  ) {
    route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSettings = false;
      }
    });
  }

  ngOnInit() {
  }

}
