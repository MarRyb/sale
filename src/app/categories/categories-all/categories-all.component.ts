import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { PostsService } from './../../core/services/post.service';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { ICategory } from '../../core/interfaces/categories.interface';
@Component({
  selector: 'app-categories-all',
  templateUrl: './categories-all.component.html',
  styleUrls: ['./categories-all.component.scss']
})
export class CategoriesAllComponent implements OnInit {

  public categories: any = [];
  private limitPosts = 8;

  constructor(
    private categoryService: CategoryService,
    private postsService: PostsService,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.categoryService.getList().subscribe(
      data => {
        this.loadPosts(data.slice(-4, -1));
      }
    )
    this.breadcrumbsService.breadcrumbsSubject.next([]);
  }

  loadPosts(data: ICategory[]) {
    from(data).pipe(
      concatMap(category => this.loadPostsForCategory(category))
    ).subscribe(data => {
      if (data.items.length > 0) {
        let item: { category?: any, posts?: [] } = {};
        item.category = data.items[0].category;
        item.posts = data.items;
        this.categories.push(item);
      }
    })
  }

  loadPostsForCategory(category: ICategory): Observable<any> {
    return this.postsService.getList({ category: category.id, limit: this.limitPosts });
  }

  ngOnInit() {
  }

}
