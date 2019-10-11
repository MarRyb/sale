
import { NgModule } from '@angular/core';
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

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ClickOutsideDirective,
        ShowAuthedDirective,
        CategoriesMenuComponent,
        BreadcrumbsComponent
    ],
    imports: [
        CommonModule,
        LogoModule,
        UiElementModule,
        RouterModule,
        InfiniteScrollModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ShowAuthedDirective,
        CategoriesMenuComponent,
        BreadcrumbsComponent,
        InfiniteScrollModule
    ]
})
export class SharedModule { }
