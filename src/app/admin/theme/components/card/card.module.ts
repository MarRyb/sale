import { NgModule } from '@angular/core';

import {
  VpCardComponent,
  VpCardBodyComponent,
  VpCardFooterComponent,
  VpCardHeaderComponent,
} from './card.component';

const VP_CARD_COMPONENTS = [
  VpCardComponent,
  VpCardBodyComponent,
  VpCardFooterComponent,
  VpCardHeaderComponent,
];

@NgModule({
  imports: [ ],
  declarations: [
    ...VP_CARD_COMPONENTS,
  ],
  exports: [
    ...VP_CARD_COMPONENTS,
  ],
})
export class VpCardModule { }
