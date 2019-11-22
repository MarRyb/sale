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
  sliderArray = [
    {id: 1, url: 'http://www.moto-net.com/sites/default/files/bmw-moto-coloris-2020_s.jpg'},
    {id: 2, url: 'http://minsk-moto.ru/uploads/product/000/77/mins_moto_ru_1-(6)_2019-07-04_18-36-18.jpg'},
    {id: 3, url: 'https://www.utiama.com/wp-content/uploads/2016/01/BM-6701.jpg'}
  ];

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngOnInit() {
  }

  reloadPost(id: number) {
    this.postsService.getById(id).subscribe(data => {
      this.post = data;
      this.breadcrumbs = [];
      this.loadBreadcrumbForCategory(data.category);
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
