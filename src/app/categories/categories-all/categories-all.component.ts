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

  constructor(
    private postsService: PostsService,
    private breadcrumbsService: BreadcrumbsService
  ) {
    merge(this.getRecentPosts(), this.getPopularPosts()).subscribe(
      (data) => {
        console.log(data);
        if (data.params.orderBy == 'countViewed') {
          this.popularPosts = data.items;
        } else {
          this.recentPosts = data.items;
        }
      }
    );
  }

  getRecentPosts(): Observable<any> {
    const params = {
      limit: this.limitPosts,
      orderBy: 'countViewed'
    };
    return this.postsService.getList(params);
  }

  getPopularPosts(): Observable<any> {
    const params = {
      limit: this.limitPosts,
      orderBy: 'created'
    };
    return this.postsService.getList(params);
  }

  ngOnInit() {
  }

}
