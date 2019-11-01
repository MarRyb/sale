import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
// import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DropdownComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    NgbModule
  ],
  exports: [
    DropdownComponent,
    ModalComponent
  ]
})
export class UiElementModule { }