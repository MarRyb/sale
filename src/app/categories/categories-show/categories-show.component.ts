import { PostsService } from './../../core/services/post.service';
import { CategoryService } from './../../core/services/category.service';
import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-show',
  templateUrl: './categories-show.component.html',
  styleUrls: ['./categories-show.component.scss']
})
export class CategoriesShowComponent implements OnInit {

  category: string;

  breadcrumbs: Array<any> = [];
  posts: Array<any> = [];
  filters: any = {};

  params: { page: number, category?: number } = {
    page: 1
  };

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.router.params.subscribe(routeParams => {
      this.category = routeParams.category;
      this.reloadPage();
    });
  }

  reloadPage() {
    this.categoryService.get(this.category).subscribe(data => {
      this.breadcrumbs = [];
      this.loadBreadcrumbForCategory(data);
      this.breadcrumbsService.breadcrumbsSubject.next(this.breadcrumbs);
      this.posts = [];
      this.params = {
        page: 1,
        category: data.id
      };
      this.getPosts();
    });
  }

  loadBreadcrumbForCategory(category) {
    if (typeof(category.parent) === 'object' && category.parent.id) {
      this.loadBreadcrumbForCategory(category.parent);
    }
    this.breadcrumbs.push({ label: category.name, url: `categories/${category.slug}` });
  }

  onScroll() {
    this.params.page += 1;
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts() {
    console.log(this.filters);
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
    console.log('assign filters', this.filters);
  }

}
