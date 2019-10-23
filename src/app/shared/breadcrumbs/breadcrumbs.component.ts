import { HOME_PAGE_BREADCRUMB, GO_ALL_CATEGORIES_BREADCRUMB_LINK } from './../../core/constans/breadcrumbs.constants';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs = [];
  breadcrumbsLink: { title?: string; url?: string; };
  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbsService.breadcrumbs
      .subscribe(data => {
        this.breadcrumbs = data;
        this.breadcrumbs.unshift(HOME_PAGE_BREADCRUMB);
      }
    );
    this.breadcrumbsService.breadcrumbsLink
      .subscribe(data => {
        this.breadcrumbsLink = data;
        this.breadcrumbsLink = GO_ALL_CATEGORIES_BREADCRUMB_LINK;
      }
    );
  }

  ngOnInit() {
  }

}
