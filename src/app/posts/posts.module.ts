import { UiElementModule } from './../__ui-element/ui-element.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { SharedModule } from './../shared/shared.module';
import { PostsAddComponent } from './posts-add/posts-add.component';

@NgModule({
  declarations: [PostsShowComponent, PostsAddComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    UiElementModule
  ],
  exports: [
    PostsAddComponent
  ]
})
export class PostsModule { }
