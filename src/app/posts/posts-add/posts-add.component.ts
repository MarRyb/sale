import { ITooltip } from './../../core/interfaces/tooltip.interface';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ICategory} from '../../core/interfaces/categories.interface'
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
  config = {
    animated: true
  };


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
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
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


}
