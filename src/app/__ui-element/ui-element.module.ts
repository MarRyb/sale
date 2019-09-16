import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopoverComponent
  ]
})
export class UiElementModule { }
