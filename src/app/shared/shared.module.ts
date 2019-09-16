import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoModule } from './header/logo/logo.module';
import { UiElementModule } from './../__ui-element/ui-element.module';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { ShowAuthedDirective } from './../directives/show-authed.directive';
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ClickOutsideDirective,
        ShowAuthedDirective
    ],
    imports: [
        CommonModule,
        LogoModule,
        UiElementModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ShowAuthedDirective
    ]
})
export class SharedModule { }
