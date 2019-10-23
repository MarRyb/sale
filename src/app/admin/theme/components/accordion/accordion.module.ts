import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpAccordionComponent } from './accordion.component';
import { VpAccordionItemComponent } from './accordion-item.component';
import { VpAccordionItemHeaderComponent } from './accordion-item-header.component';
import { VpAccordionItemBodyComponent } from './accordion-item-body.component';

const ACCORDION_COMPONENTS = [
  VpAccordionComponent,
  VpAccordionItemComponent,
  VpAccordionItemHeaderComponent,
  VpAccordionItemBodyComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [...ACCORDION_COMPONENTS],
  declarations: [...ACCORDION_COMPONENTS],
  providers: [],
})
export class VpAccordionModule {}
