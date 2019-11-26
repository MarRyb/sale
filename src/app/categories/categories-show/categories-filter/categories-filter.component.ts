import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['../../categories-all/categories-all-filter/categories-all-filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {

  @Output() changeData = new EventEmitter();
  public form = new FormGroup({
    startPrice: new FormControl(null),
    endPrice: new FormControl(null),
    state: new FormGroup({
      new: new FormControl(''),
      used: new FormControl('')
    })
  });

  constructor() {
  }

  submit() {
    this.changeData.emit(this.form.getRawValue());
  }

  ngOnInit() {
  }

}
