import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-add-preview',
  templateUrl: './posts-add-preview.component.html',
  styleUrls: ['./posts-add-preview.component.scss']
})
export class PostsAddPreviewComponent implements OnInit {

  @Output() closePreview = new EventEmitter();
  @Input() form: any;
  @Input() photos: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.form.data = this.photos.filter(i => i.file).map(i => i.file);
  }

  togglePreview() {
    this.closePreview.emit();
  }

}
