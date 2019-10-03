import { HOME_PAGE_BREADCRUMB } from './../../core/constans/breadcrumbs.constants';
import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-categories-show',
  templateUrl: './categories-show.component.html',
  styleUrls: ['./categories-show.component.sass']
})
export class CategoriesShowComponent implements OnInit {
  breadcrumbs: Array<any> = [
    HOME_PAGE_BREADCRUMB
  ];

  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbsService.breadcrumbsSubject.next(this.breadcrumbs);
  }

  ngOnInit() {
  }

}
