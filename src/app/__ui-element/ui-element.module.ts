import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    DropdownComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  exports: [
    DropdownComponent,
    TooltipComponent
  ]
})
export class UiElementModule { }