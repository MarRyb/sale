import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';

import { AuthModule } from './../auth/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainContentComponent
  ]
})
export class SharedModule { }
