import { ICategoryCustom } from './../../core/interfaces/IShowSub';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.scss']
})
export class RubricsComponent implements OnInit {
  categoryParentList: Array<ICategoryCustom> = [];
  categoryChildList: Array<ICategoryCustom> = [];
  categorySubChildList: Array<ICategoryCustom> = [];

  constructor(public category: CategoryService) { }

  ngOnInit() {
    this.category.getList().subscribe(
      (response) => this.categoryParentList = response
    );
  }
  getSubCategoryItem(item) {
    this.categoryChildList = item.children;
  }
  getSubChildCategoryItem(item) {
    this.categorySubChildList = item.children;
  }


}
