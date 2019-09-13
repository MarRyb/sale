import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { LogoImgComponent } from './logo-img/logo-img.component';

@NgModule({
    declarations: [
        LogoComponent,
        LogoImgComponent
    ],
    exports: [
        LogoComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LogoModule { }
