
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

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ClickOutsideDirective,
        ShowAuthedDirective,
        CategoriesMenuComponent,
        BreadcrumbsComponent,
        CarouselComponent
    ],
    imports: [
        CommonModule,
        LogoModule,
        UiElementModule,
        RouterModule,
        InfiniteScrollModule,
        MDBBootstrapModule.forRoot()
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
        UiElementModule
    ]
})
export class SharedModule { }
