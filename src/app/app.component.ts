import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShowElemToAuth = false;
  arrayUrl: [];
  constructor(private currentUser: CurrentUserService,
              @Inject(WINDOW) private window: Window,
              // tslint:disable-next-line: ban-types
              @Inject(PLATFORM_ID) private platformId: Object,
              private route: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser.authenticate();
    }
    route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const arrayUrl = ['/signin', '/registration', '/forgot-password', '/update-password', '/forgot-email/verify'];
        this.isShowElemToAuth = true;
        if (arrayUrl.includes(event.url)) {
          this.isShowElemToAuth = false;
        }
      }
    });
  }
  title = 'kash';

  ngOnInit() {
  }
  onActivate() {
    if (isPlatformBrowser(this.platformId)) {
      this.window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

}
