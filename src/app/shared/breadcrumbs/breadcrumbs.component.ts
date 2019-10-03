import { HOME_PAGE_BREADCRUMB } from './../../core/constans/breadcrumbs.constants';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs = [];
  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbsService.breadcrumbs
      .subscribe(data => {
          this.breadcrumbs = data;
          this.breadcrumbs.unshift(HOME_PAGE_BREADCRUMB);
        }
      );
  }

  ngOnInit() {
  }

}
