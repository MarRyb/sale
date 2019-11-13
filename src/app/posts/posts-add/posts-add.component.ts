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

  public form: FormGroup;
  unsubcribe: any;



  public fields: any[] = [
    {
      type: 'textarea',
      name: 'firstName',
      label: 'First Name',
      value: ''
    },
    {
      type: 'price',
      name: 'price',
      label: 'Цена товара',
      value: '',
      options: [
        { key: 'exchange', label: 'Обмен' },
        { key: 'Selling for', label: 'Продажа за',
          params: {
            input: {
              type: 'input',
              name: 'price',
              label: 'Цена',
              value: ''
            },
            select: {
              type: 'select',
              name: 'currency',
              label: 'Валюта',
              value: 'in',
              options: [
                { key: 'uan', label: 'грн.' },
                { key: 'doll', label: 'долл.' }
              ]
            },
            checkbox: {
              type: 'checkbox',
              name: 'bargain',
              label: 'Возможен торг',
              options: [
                { key: 'barg', label: 'Возможен торг' }
              ]
            }
          }
        },
        { key: 'Negotiable price', label: 'Цена договорная' }
      ]
    },
    {
      type: 'input',
      name: 'lastName',
      label: 'Last Name',
      value: ''
    },
    {
      type: 'select',
      name: 'country',
      label: 'Country',
      value: 'in',
      options: [
        { key: 'in', label: 'India' },
        { key: 'us', label: 'USA' }
      ]
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'in',
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ]
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' },
        { key: 'd', label: 'Fishing' },
        { key: 'q', label: 'Cooking' },
        { key: 'w', label: 'Fishing' },
        { key: 'e', label: 'Cooking' },
        { key: 'r', label: 'Fishing' },
        { key: 't', label: 'Cooking' }
      ]
    }
  ];


  constructor(private modalService: BsModalService) {
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
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
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
  }


  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }
}
