import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.scss']
})
export class PostsShowComponent implements OnInit {

  public post: any;
  private breadcrumbs: any = [];

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.route.params.subscribe((data) => {
      this.reloadPost(data.id);
    });
  }

  ngOnInit() {
  }

  reloadPost(id: number) {
    this.postsService.getById(id).subscribe(data => {
      this.post = data;
      this.reloadBreadcrumbs();
    });
  }

  reloadBreadcrumbs() {
    this.breadcrumbs = [];
    this.loadBreadcrumbForCategory(this.post.category);
    this.breadcrumbs.push({ label: this.post.title, url: `posts/${this.post.id}` });
    this.breadcrumbsService.breadcrumbsSubject.next(this.breadcrumbs);
  }

  loadBreadcrumbForCategory(category) {
    if (typeof(category.parent) === 'object' && category.parent.id) {
      this.loadBreadcrumbForCategory(category.parent);
    }
    this.breadcrumbs.push({ label: category.name, url: `categories/${category.slug}` });
  }

}
