import { CategoriesRoutingModule } from './categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [CategoriesShowComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
