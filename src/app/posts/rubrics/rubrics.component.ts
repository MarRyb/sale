import { ICategory } from './../../core/interfaces/categories.interface';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.scss']
})
export class RubricsComponent implements OnInit {

  @Output() getCurrentCategory = new EventEmitter();

  categoryParentList: Array<ICategory> = [];
  categoryChildList: Array<ICategory> = [];
  categorySubChildList: Array<ICategory> = [];
  categoryChildListTitle: string;
  categorySubChildListTitle: string;
  selectedCategories = {
    array: [],
    hideModal: false
  };

  constructor(public category: CategoryService) { }

  ngOnInit() {
    this.category.getList().subscribe(
      (response) => this.categoryParentList = response
    );
  }
  getCategoryItem(item) {
    this.selectedCategories.array = [];
    this.selectedCategories.array.push(item.name);
    if (item.children.length === 0) {
      this.selectedCategories.hideModal = true;
    }
    this.categoryChildList = item.children;
    this.categoryChildListTitle = item.name;
  }
  getSubCategoryItem(item) {
    this.selectedCategories.array.splice(1, 1);
    this.selectedCategories.array.push(item.name);
    if (item.children.length === 0) {
      this.selectedCategories.hideModal = true;
    }
    this.categorySubChildList = item.children;
    this.categorySubChildListTitle = item.name;
  }

  getSubChildCategoryItem(item) {
    this.selectedCategories.array.splice(2, 1);
    this.selectedCategories.array.push(item.name);
    this.selectedCategories.hideModal = true;
  }

  selectedCategory(array) {
    this.getCurrentCategory.emit(array);
  }
}
