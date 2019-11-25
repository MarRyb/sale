import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from './../../../core/services/category.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-categories-all-filter',
  templateUrl: './categories-all-filter.component.html',
  styleUrls: ['./categories-all-filter.component.scss']
})
export class CategoriesAllFilterComponent implements OnInit {

  public categories: any = [];
  public form: FormGroup;

  @Output() changeData = new EventEmitter();

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.getList().subscribe(
      data => this.categories = data
    );
    this.form = new FormGroup({
      startPrice: new FormControl(null),
      endPrice: new FormControl(null),
      category: new FormControl(''),
      state: new FormGroup({
        new: new FormControl(''),
        used: new FormControl('')
      })
    });
  }

  submit() {
    this.changeData.emit(this.form.getRawValue());
  }

  ngOnInit() {
  }

}
