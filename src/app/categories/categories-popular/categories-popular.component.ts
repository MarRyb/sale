import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { POPULAR_POSTS_BREADCRUMB } from './../../core/constans/breadcrumbs.constants';
import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../core/services/post.service';

@Component({
  selector: 'app-categories-popular',
  templateUrl: './categories-popular.component.html',
  styleUrls: ['./categories-popular.component.scss',
              '../categories-all/categories-all.component.scss']
})
export class CategoriesPopularComponent implements OnInit {

  breadcrumbs: Array<any> = [];
  posts: Array<any> = [];
  filters: any = {};

  params: { page: number, orderBy: string, limit: number } = {
    page: 1,
    orderBy: 'countViewed',
    limit: 12
  };

  constructor(
    private postsService: PostsService,
    private breadcrumbsService: BreadcrumbsService
  ) { }

  onScroll() {
    this.params.page += 1;
    this.getPosts();
  }

  ngOnInit() {
    this.getPosts();
    this.breadcrumbsService.breadcrumbsSubject.next([POPULAR_POSTS_BREADCRUMB]);
  }

  getPosts() {
    this.postsService.getList(Object.assign(this.filters, this.params)).subscribe(data => {
      this.posts = [...this.posts, ...data.items] ;
    });
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
    this.posts = [];
    this.params.page = 1;
    this.getPosts();
  }

}
