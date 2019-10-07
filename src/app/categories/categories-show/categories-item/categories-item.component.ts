import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.sass']
})
export class CategoriesItemComponent implements OnInit {
  @Input() posts: [];
  constructor() {
  }

  ngOnInit() {
  }

}
