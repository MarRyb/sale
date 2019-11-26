import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { CurrentUserService } from '../../core/services/current-user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showSettings = false;
  modalRef: BsModalRef;
  config = {
    animated: true
  };

  constructor(
    public currentUserService: CurrentUserService,
    private modalService: BsModalService,
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide();
  }


}
