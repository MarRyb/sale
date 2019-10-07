import { PostsService } from './../../core/services/post.service';
import { CategoryService } from './../../core/services/category.service';
import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-show',
  templateUrl: './categories-show.component.html',
  styleUrls: ['./categories-show.component.sass']
})
export class CategoriesShowComponent implements OnInit {
  breadcrumbs: Array<any> = [];
  category: string;
  posts: Array<any> = [];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private postsService: PostsService
    ) {
      this.router.params.subscribe(routeParams => {
        this.category = routeParams.category;
      });
      this.categoryService.get(this.category).subscribe(data => {
        this.breadcrumbs.push({ label: 'data.parentName', url: `categories/${data.slug}` });
        this.breadcrumbs.push({ label: data.name, url: `categories/${data.slug}` });
      });
      this.breadcrumbsService.breadcrumbsSubject.next(this.breadcrumbs);
      this.postsService.getList().subscribe(data => {
        this.posts = data.items;
      });
    }

  ngOnInit() {
  }

}
