import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoModule } from './header/logo/logo.module';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        LogoModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class SharedModule { }
