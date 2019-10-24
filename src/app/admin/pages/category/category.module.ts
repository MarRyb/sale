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

@NgModule({
    declarations: [
        CategoryManagmentComponent,
        CategoryManagmentItemComponent,
        CategoryCreateComponent
    ],
    imports: [
        CommonModule,
        CategoryManagmentRoutingModule,
        ReactiveFormsModule,
        VpAccordionModule,
        VpCardModule,
        NgSelectModule,
        AlertModule.forRoot(),
    ]
})
export class CategoryManagmentModule { }
