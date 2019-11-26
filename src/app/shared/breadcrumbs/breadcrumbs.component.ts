import { HOME_PAGE_BREADCRUMB, GO_ALL_CATEGORIES_BREADCRUMB_LINK } from './../../core/constans/breadcrumbs.constants';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any;
  breadcrumbsLink: { title?: string; url?: string; };
  subscription: any;
  homeBreadcrumb = HOME_PAGE_BREADCRUMB;

  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbs = this.breadcrumbsService.breadcrumbs;
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
