import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    DropdownComponent,
    ModalComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  exports: [
    DropdownComponent,
    ModalComponent,
    TooltipComponent
  ]
})
export class UiElementModule { }