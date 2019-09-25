import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryHeaderComponent } from './header/header.component';
import { CategoryRoutingModule } from './category-routing.module';

import {AuthModule} from '../auth/auth.module';


@NgModule({
  declarations: [CategoryHeaderComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AuthModule
  ]
})
export class CategoryModule { }
