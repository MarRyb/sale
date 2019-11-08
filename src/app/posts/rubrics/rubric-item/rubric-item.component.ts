import { ICategoryCustom } from './../../../core/interfaces/IShowSub';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss']
})
export class RubricItemComponent implements OnInit {
  @Input() categoryList: Array<ICategoryCustom> = [];
  @Output() getSubCategory = new EventEmitter();

  constructor() { }

  getSubCategoryItem(item: Array<ICategoryCustom>) {
    this.getSubCategory.emit(item);
  }
  ngOnInit() {
  }

}
