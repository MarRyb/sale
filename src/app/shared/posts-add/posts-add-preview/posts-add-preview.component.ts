import { CustomField } from 'src/app/core/interfaces/post';
import { CurrentUserService } from './../../../core/services/current-user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-posts-add-preview',
  templateUrl: './posts-add-preview.component.html',
  styleUrls: ['./posts-add-preview.component.scss']
})
export class PostsAddPreviewComponent implements OnInit {

  @Output() closePreview = new EventEmitter();
  @Input() form: any;
  @Input() category: any;
  @Input() photos: Array<any> = [];

  public post: any = {};

  constructor(
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit() {
    this.post = this.form;
    this.post.data = this.photos.filter(i => i.file).map(i => i.file);
    this.post.user = this.currentUserService.get();
    this.post.created = new Date();
    this.post.countViewed = 0;
    this.post.category = this.category;
    this.post.postCustomFields = this.form.postCustomFields.map(field => {
      const customField = this.category.customFields.find(i => i.id == field.customField);
      let value = customField.value.find(i => i.value == field.value);
      if (!value) {
        value = field.value;
      } else {
        value = value.label;
      }
      return { value, customField };
    });
  }

  togglePreview() {
    this.closePreview.emit();
  }

}
