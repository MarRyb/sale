import { PostsAddComponent } from './posts-add/posts-add.component';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoModule } from './header/logo/logo.module';
import { UiElementModule } from './../__ui-element/ui-element.module';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { ShowAuthedDirective } from './../directives/show-authed.directive';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CarouselComponent } from './carousel/carousel.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RubricsComponent } from './rubrics/rubrics.component';
import { RubricItemComponent } from './rubrics/rubric-item/rubric-item.component';
import { DynamicFormBuilderModule } from './../dynamic-form-builder/dynamic-form-builder.module';
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ClickOutsideDirective,
        ShowAuthedDirective,
        CategoriesMenuComponent,
        BreadcrumbsComponent,
        CarouselComponent,
        PostsAddComponent,
        RubricsComponent,
        RubricItemComponent
    ],
    imports: [
        CommonModule,
        LogoModule,
        UiElementModule,
        RouterModule,
        InfiniteScrollModule,
        MDBBootstrapModule.forRoot(),
        NgxfUploaderModule,
        ReactiveFormsModule,
        FormsModule,
        DynamicFormBuilderModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ShowAuthedDirective,
        CategoriesMenuComponent,
        BreadcrumbsComponent,
        InfiniteScrollModule,
        CarouselComponent,
        UiElementModule,
        PostsAddComponent
    ]
})
export class SharedModule { }
