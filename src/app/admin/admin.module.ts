// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { MenuModule } from './theme/components/menu/menu.module';
import { VpSidebarModule } from './theme/components/sidebar/sidebar.module';
import { VpCardModule } from './theme/components/card/card.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { VpTabsetModule } from './theme/components/tabset/tabset.module';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

defineLocale('ru', ruLocale);
@NgModule({
    declarations: [
        AdminBaseComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        MenuModule.forRoot(),
        VpSidebarModule.forRoot(),
        VpCardModule,
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        InfiniteScrollModule,
        VpTabsetModule,
        AlertModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
    ],
})
export class AdminModule { }

