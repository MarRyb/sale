import { CategoriesRoutingModule } from './categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { SharedModule } from './../shared/shared.module';
import { CategoriesItemComponent } from './categories-show/categories-item/categories-item.component';
import { CategoriesFilterComponent } from './categories-show/categories-filter/categories-filter.component';
import { CategoriesAllComponent } from './categories-all/categories-all.component';
import { CategoriesAllFilterComponent } from './categories-all/categories-all-filter/categories-all-filter.component';
import { CategoriesAllItemComponent } from './categories-all/categories-all-item/categories-all-item.component';

@NgModule({
  declarations: [
    CategoriesShowComponent,
    CategoriesItemComponent,
    CategoriesFilterComponent,
    CategoriesAllComponent,
    CategoriesAllFilterComponent,
    CategoriesAllItemComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
