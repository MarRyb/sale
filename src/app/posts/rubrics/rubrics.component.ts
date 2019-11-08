import { ICategory } from './../../core/interfaces/categories.interface';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.scss']
})
export class RubricsComponent implements OnInit {
  categoryParentList: Array<ICategory> = [];
  categoryChildList: Array<ICategory> = [];
  categorySubChildList: Array<ICategory> = [];
  categoryChildListTitle: string;
  categorySubChildListTitle: string;

  constructor(public category: CategoryService) { }

  ngOnInit() {
    this.category.getList().subscribe(
      (response) => this.categoryParentList = response
    );
  }
  getSubCategoryItem(item) {
    this.categoryChildList = item.children;
    this.categoryChildListTitle = item.name;
  }
  getSubChildCategoryItem(item) {
    this.categorySubChildList = item.children;
    this.categorySubChildListTitle = item.name;
  }


}
