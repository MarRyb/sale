import { CategoriesRoutingModule } from './categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { SharedModule } from './../shared/shared.module';
import { CategoriesItemComponent } from './categories-show/categories-item/categories-item.component';
import { CategoriesFilterComponent } from './categories-show/categories-filter/categories-filter.component';

@NgModule({
  declarations: [CategoriesShowComponent, CategoriesItemComponent, CategoriesFilterComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }