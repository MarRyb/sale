import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.sass']
})
export class PostsShowComponent implements OnInit {

  params = [
    { key: "Объявление от:", value: "Частного лица" },
    { key: "Марка:", value: "Toyota" },
    { key: "Модель:", value: "Corolla" },
    { key: "Год выпуска:", value: "2019" },
    { key: "Тип кузова:", value: "Седан" },
    { key: "Цвет:", value: "Белый" },
    { key: "Вид топлива:", value: "Бензин, 95" },
    { key: "Обьем двигателя:", value: "1 500 см2" },
    { key: "Коробка передач:", value: "АКПП" },
    { key: "Состояние машины:", value: "Не бит; Крашено 2 элемента" },
    { key: "Мультимедиа:", value: "СD; USB; Аккустика" },
    { key: "Безопасность:", value: "Сигнализация; Центральный замок" },
    { key: "Прочее:", value: "Газовая установка (ГБО)" },
    { key: "Растаможена:", value: "Да" }
  ]

  constructor() { }

  ngOnInit() {
  }

}