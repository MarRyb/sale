import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-all-item',
  templateUrl: './categories-all-item.component.html',
  styleUrls: ['./categories-all-item.component.scss']
})
export class CategoriesAllItemComponent implements OnInit {

  @Input() post: any;

  constructor() { }

  ngOnInit() {
  }

}
