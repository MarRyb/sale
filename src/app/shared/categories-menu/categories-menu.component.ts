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
  constructor(private category: CategoryService) {
  }

  doShow(item: { isShowSubCategory: boolean; }) {
    this.categoryList.forEach(function(elem){
      elem.isShowSubCategory = false;
    });
    return item.isShowSubCategory = true;
  }

  ngOnInit() {
    this.category.getList().subscribe(
      (response) => {
        return this.categoryList = response;
      }
    );
  }

}
