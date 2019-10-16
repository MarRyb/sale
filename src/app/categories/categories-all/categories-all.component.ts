import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-all',
  templateUrl: './categories-all.component.html',
  styleUrls: ['./categories-all.component.scss']
})
export class CategoriesAllComponent implements OnInit {

  categories = [
    {
      title: 'Одежда и обувь',
      posts: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: 'Электроника',
      posts: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: 'Аксессуары',
      posts: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
