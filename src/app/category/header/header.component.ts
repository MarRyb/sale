import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../core/services/category.service';

@Component({
  selector: 'app-category-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class CategoryHeaderComponent implements OnInit {
  isShowSubCategory = false;
  constructor(private category: CategoryService) {
  }

  doShow() {
    this.isShowSubCategory = true;
  }

  ngOnInit() {
    this.category.getList().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
