import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpAccordionModule } from '../../theme/components/accordion/accordion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { CategoryManagmentItemComponent } from './category-managment/category-managment-item/category-managment-item.component';
import { CategoryManagmentRoutingModule } from './category-routing.module';
import { VpCardModule } from '../../theme/components/card/card.module';
import { CategoryCreateComponent } from './category-managment/category-create/category-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CustomFieldManagmentComponent } from './custom-field-managment/custom-field-managment.component';
// tslint:disable:max-line-length
import { CustomFieldManagmentItemComponent } from './custom-field-managment/custom-field-managment-item/custom-field-managment-item.component';
import { CustomFieldManagmentCreateComponent } from './custom-field-managment/custom-field-managment-create/custom-field-managment-create.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        CategoryManagmentComponent,
        CategoryManagmentItemComponent,
        CategoryCreateComponent,
        CustomFieldManagmentComponent,
        CustomFieldManagmentItemComponent,
        CustomFieldManagmentCreateComponent
    ],
    imports: [
        CommonModule,
        CategoryManagmentRoutingModule,
        ReactiveFormsModule,
        VpAccordionModule,
        VpCardModule,
        NgSelectModule,
        AlertModule.forRoot(),
        InfiniteScrollModule
    ]
})
export class CategoryManagmentModule { }
