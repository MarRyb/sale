import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private currentUser: CurrentUserService,
              @Inject(WINDOW) private window: Window) {
    this.currentUser.authenticate();
  }
  title = 'kash';

  ngOnInit() {}
  onActivate() {
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
