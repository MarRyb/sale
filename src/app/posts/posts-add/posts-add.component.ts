import { PostsService } from './../../core/services/post.service';
import { ITooltip } from './../../core/interfaces/tooltip.interface';
import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';




@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.scss']
})
export class PostsAddComponent implements OnInit {
  public isFocus: boolean = false;
  public settingsTooltipInfo: ITooltip;
  public settingsTooltipWarning: ITooltip;
  public selectedCategories = [];
  public isShowSelectRubrics = true;
  modalRef: BsModalRef;
  public form: FormGroup;
  public fields: any[];
  public photoItem: any = {};
  public postForm: FormGroup;
  isUploading: boolean = true;
  progress: number = 0;
  public photos: any[] = [
    {uploadStatus: {}}, {uploadStatus: {}}, {uploadStatus: {}}, {uploadStatus: {}}, {uploadStatus: {}}, {uploadStatus: {}}, {uploadStatus: {}}
  ];

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    public post: PostsService,
    private Upload: NgxfUploaderService
  ) {
    this.settingsTooltipInfo = {
      imgUrl: 'assets/img/icon Инфо.png',
      placement: 'right',
      contentHtml: `
        <div>Введите наименование товара или услуги.</div>
        <br>
        <div>Чем точнее будет заголовок, тем больше вероятность что на Ваше обьявление отреагируют</div>
      `,
      click: ''
    };
    this.settingsTooltipWarning = {
      imgUrl: 'assets/img/warning.png',
      placement: 'right',
      contentHtml: `
        <div class="tooltip-text-red">Введите описание.</div>
        <br>
        <div class="tooltip-text-red">Описание должно быть не мение 20 символов.</div>
      `,
      click: ''
    };
    this.form = new FormGroup({
      fields: new FormControl(this.fields)
    });
  }


// START


  uploadFile(file: File | FileError, index: number): void {
    var photo = this.photos[index];
    photo.uploadStatus.isUploading = true;
    if (!(file instanceof File)) {
      photo.uploadStatus.isUploading = false;
      return;
    }
    this.Upload.upload({
      url: 'http://test4.vpotoke.com/api/v1/posts/files',
      filesKey: 'path', // Option
      files: file,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
        photo.uploadStatus.progress = event.percent;
        if (event.status === UploadStatus.Completed) {
          console.log('This file upload success!', event);
          photo.file = event.data;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        photo.uploadStatus.isUploading = false;
        console.log('complete');
      });
  }

// END


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: true});
  }
  focusInput() {
    this.isFocus = true;
    this.settingsTooltipInfo.click = 'click';
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      category: new FormControl(null),
      type: new FormControl(null),
      price: new FormControl(null),
      currency: new FormControl(null),
      // bargain: new FormGroup({ barg: new FormControl('') }),
      postCustomFields: new FormControl(null)
    });
  }


  selectedCategory(item) {
    this.selectedCategories = item.array;
    if (item.hideModal === true) {
      this.modalRef.hide();
      this.isShowSelectRubrics = false;
    }
    this.postForm.controls.category.setValue(item.itemCategory.id);
    this.fields = item.itemCategory.customFields;
  }


  getFields() {
    return this.fields;
  }

  onSubmit() {
    this.post.new(this.postForm.value).subscribe(data => {
      const postId = data.id;
      const photos = this.photos.filter(i => i.id);
      this.onClose.emit();
      photos.forEach((photo) => {
        this.post.attachPostFile(postId, photo.id).subscribe(
          data => {
            console.log(data);
          });
      });
    }, (err) => {
      console.log(err.error.error.exception[0].message);
      this.modalRef.hide();
    });
  }

  getCustomFields(data: any) {
    const postCustomFields = [];
    for (const key in data) {
      postCustomFields.push({ value: data[key], customField: key });
    }
    this.postForm.controls.postCustomFields.setValue(postCustomFields);
  }

}
