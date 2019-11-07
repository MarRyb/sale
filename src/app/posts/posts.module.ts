import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { SharedModule } from './../shared/shared.module';
import { PostsAddComponent } from './posts-add/posts-add.component';
import { RubricsComponent } from './rubrics/rubrics.component';
import { RubricItemComponent } from './rubrics/rubric-item/rubric-item.component';

@NgModule({
  declarations: [PostsShowComponent, PostsAddComponent, RubricsComponent, RubricItemComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  exports: [
    PostsAddComponent
  ]
})
export class PostsModule { }
