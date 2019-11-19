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

  params = [
    { key: 'Объявление от:', value: 'Частного лица' },
    { key: 'Марка:', value: 'Toyota' },
    { key: 'Модель:', value: 'Corolla' },
    { key: 'Год выпуска:', value: '2019' },
    { key: 'Тип кузова:', value: 'Седан' },
    { key: 'Цвет:', value: 'Белый' },
    { key: 'Вид топлива:', value: 'Бензин, 95' },
    { key: 'Обьем двигателя:', value: '1 500 см2' },
    { key: 'Коробка передач:', value: 'АКПП' },
    { key: 'Состояние машины:', value: 'Не бит; Крашено 2 элемента' },
    { key: 'Мультимедиа:', value: 'СD; USB; Аккустика' },
    { key: 'Безопасность:', value: 'Сигнализация; Центральный замок' },
    { key: 'Прочее:', value: 'Газовая установка (ГБО)' },
    { key: 'Растаможена:', value: 'Да' }
  ];

  modalRef: BsModalRef;
  config = {
    animated: true
  };
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngOnInit() {
  }

}
