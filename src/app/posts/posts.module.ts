
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { SharedModule } from './../shared/shared.module';
import { PostsAddComponent } from './posts-add/posts-add.component';
import { RubricsComponent } from './rubrics/rubrics.component';
import { RubricItemComponent } from './rubrics/rubric-item/rubric-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilderModule } from './../dynamic-form-builder/dynamic-form-builder.module';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsShowComponent, PostsAddComponent, RubricsComponent, RubricItemComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    DynamicFormBuilderModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    FormsModule
  ],
  exports: [
    PostsAddComponent
  ]
})
export class PostsModule { }
