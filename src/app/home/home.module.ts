import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { HomeRoutingModule } from './home-routing.module';

import {AuthModule} from '../auth/auth.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule
  ]
})
export class HomeModule { }
