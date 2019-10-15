import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { SharedModule } from './../shared/shared.module';
@NgModule({
  declarations: [PostsShowComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
