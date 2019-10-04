import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../core/services/category.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.sass']
})
export class CategoriesMenuComponent implements OnInit {
  isShowSubCategory = false;
  categoryList = [];
  constructor(private category: CategoryService) {}

  doShow(item: { isShowSubCategory: boolean; }) {
    if (item.isShowSubCategory === true) {
      return item.isShowSubCategory = false;
    } else {
      this.categoryList.forEach(
        (elem) => elem.isShowSubCategory = false
      );
      return item.isShowSubCategory = !item.isShowSubCategory;
    }
  }

  showCategoryAction() {
    return true;
  }


  ngOnInit() {
    this.category.getList().subscribe(
      (response) => this.categoryList = response
    );
  }

}