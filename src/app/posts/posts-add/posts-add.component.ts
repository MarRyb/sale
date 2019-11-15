import { PostsService } from './../../core/services/post.service';
import { ITooltip } from './../../core/interfaces/tooltip.interface';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  public customFields: [];
  public form: FormGroup;
  unsubcribe: any;
  public fields: any[];
  public photoItem: any = {};

  public photos: any[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]

  public fieldsPrice: any[] = [
    {
      type: 'price',
      name: 'Цена товара',
      value: [
        { key: 'exchange', name: 'Обмен' },
        { key: 'Selling for', name: 'Продажа за',
          params: {
            input: {
              type: 'input',
              id: 'price',
              name: 'Цена'
            },
            select: {
              type: 'select',
              id: 'currency',
              name: 'грн',
              value: [
                { value: 'uan', label: 'грн.' },
                { value: 'doll', label: 'долл.' }
              ]
            },
            checkbox: {
              type: 'checkbox',
              id: 'bargain',
              value: [
                { value: 'barg', label: 'Возможен торг' }
              ]
            }
          }
        },
        { key: 'Negotiable price', name: 'Цена договорная' }
      ]
    }
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
      fields: new FormControl(JSON.stringify(this.fields)),
      fieldsPrice: new FormControl(JSON.stringify(this.fieldsPrice))
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields),
      this.fieldsPrice = JSON.parse(update.fieldsPrice);
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
  }


  selectedCategory(item) {
    this.selectedCategories = item.array;
    if (item.hideModal === true) {
      this.modalRef.hide();
      this.isShowSelectRubrics = false;
    }
    this.fields = item.itemCategory.customFields;
  }


  getFields() {
    return this.fields;
  }
  getFieldsPrice() {
    return this.fieldsPrice;
  }

  ngDistroy() {
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
}
