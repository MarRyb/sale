import { ICategory } from './../../../core/interfaces/categories.interface';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss']
})
export class RubricItemComponent implements OnInit {
  @Input() categoryList: Array<ICategory> = [];
  @Input() rubricTitle: string;
  @Output() getSubCategory = new EventEmitter();

  constructor() { }

  getSubCategoryItem(item: Array<ICategory>) {
    this.getSubCategory.emit(item);
  }
  ngOnInit() {
  }

}
