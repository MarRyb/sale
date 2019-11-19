import { PostsService } from './../../core/services/post.service';
import { ITooltip } from './../../core/interfaces/tooltip.interface';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
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
  unsubcribe: any;
  public fields: any[];
  public photoItem: any = {};
  public postForm: FormGroup;

  public photos: any[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ];

  constructor(
    private modalService: BsModalService,
    public post: PostsService
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
      fields: new FormControl(JSON.stringify(this.fields))
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields)
    });
  }
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
    this.postForm.controls['category'].setValue(item.itemCategory.id);
    this.fields = item.itemCategory.customFields;
  }


  getFields() {
    return this.fields;
  }

  ngOnDestroy() {
    this.unsubcribe();
  }

  uploadFile(event, index) {
    if (event.target.files) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file = fileList[0];
        const formData = new FormData();
        formData.append('path', file, file.name);
        this.post.postFiles(formData).subscribe(data => {
          return this.photos[index] = data;
        });
      }
    }
  }
  onSubmit() {
    this.post.new(this.postForm.value).subscribe(data => {
      console.log(this.postForm);
    }, (err) => {
      const photos = this.photos.filter(i => {return i.id });
      photos.forEach((photo) => {
        this.post.attachPostFile(51, photo.id).subscribe(
          data => {
            console.log(data);
          })
      });
      console.log(err.error.error.exception[0].message);
    })
  }

  getCustomFields(data) {
    const postCustomFields = [];
    for (const key in data) {
      postCustomFields.push({ value: data[key], customField: key });
    }
    this.postForm.controls['postCustomFields'].setValue(postCustomFields);
  }

}
