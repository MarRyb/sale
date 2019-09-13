import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(private currentUser: CurrentUserService){
    this.currentUser.authenticate();
  }
  title = 'kash';

  ngOnInit(){}
  
  onActivate() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

}
