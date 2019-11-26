
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostsShowComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
  ]
})
export class PostsModule { }
