import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private currentUser: CurrentUserService,
              @Inject(WINDOW) private window: Window,
              // tslint:disable-next-line: ban-types
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser.authenticate();
    }
  }
  title = 'kash';

  ngOnInit() {}
  onActivate() {
    if (isPlatformBrowser(this.platformId)) {
      this.window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

}
