import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VpTabsetComponent, VpTabComponent } from './tabset.component';
import { BadgeModule } from '../badge/badge.module';


const TABSET_COMPONENTS = [
  VpTabsetComponent,
  VpTabComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
  ],
  declarations: [
    ...TABSET_COMPONENTS,
  ],
  exports: [
    ...TABSET_COMPONENTS,
  ],
})
export class VpTabsetModule { }
