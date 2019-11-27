import { BreadcrumbsService } from './../../shared/breadcrumbs/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './../../core/services/post.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.scss']
})
export class PostsShowComponent implements OnInit {
  sliderArray = [];

  public post: any;
  private breadcrumbs: any = [];

  modalRef: BsModalRef;
  config = {
    animated: true
  };
  constructor(
    private modalService: BsModalService,
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
      this.breadcrumbs = [];
      this.loadBreadcrumbForCategory(data.category);
      this.sliderArray = data.data.map(item => {
        return {id: item.id, url: `http://test4.vpotoke.com/${item.path}` }
      });
      this.breadcrumbs.push({ label: data.title, url: `posts/${data.id}` });
      this.breadcrumbsService.breadcrumbsSubject.next(this.breadcrumbs);
    });
  }

  loadBreadcrumbForCategory(category) {
    if (typeof(category.parent) === 'object' && category.parent.id) {
      this.loadBreadcrumbForCategory(category.parent);
    }
    this.breadcrumbs.push({ label: category.name, url: `categories/${category.slug}` });
  }

}
