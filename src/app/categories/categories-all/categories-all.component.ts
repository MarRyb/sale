import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { PostsService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
@Component({
  selector: 'app-categories-all',
  templateUrl: './categories-all.component.html',
  styleUrls: ['./categories-all.component.scss']
})
export class CategoriesAllComponent implements OnInit {

  public popularPosts: any = [];
  public recentPosts: any = [];
  private limitPosts = 8;
  private filters: any = {};

  constructor(
    private postsService: PostsService,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.reloadPosts();
    this.breadcrumbsService.breadcrumbsSubject.next([]);
  }

  getRecentPosts(): Observable<any> {
    const params = {
      limit: this.limitPosts,
      orderBy: 'countViewed'
    };

    return this.postsService.getList(Object.assign(this.filters, params));
  }

  getPopularPosts(): Observable<any> {
    const params = {
      limit: this.limitPosts,
      orderBy: 'created'
    };
    return this.postsService.getList(Object.assign(this.filters, params));
  }

  reloadPosts() {
    merge(this.getRecentPosts(), this.getPopularPosts()).subscribe(
      (data) => {
        if (data.params.orderBy == 'countViewed') {
          this.popularPosts = data.items;
        } else {
          this.recentPosts = data.items;
        }
      }
    );
  }

  ngOnInit() {
  }

  applyFilters(data: any) {
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === '') && delete data[key]);
    if ((data.state.used && data.state.new) || (!data.state.used && !data.state.new)) {
      data.state = 'all';
    } else {
      if (data.state.new) {
        data.state = 'new';
      } else {
        data.state = 'used';
      }
    }
    this.filters = data;
    this.reloadPosts();
  }

}
