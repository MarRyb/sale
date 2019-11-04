import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    DropdownComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    DropdownComponent,
    ModalComponent
  ]
})
export class UiElementModule { }