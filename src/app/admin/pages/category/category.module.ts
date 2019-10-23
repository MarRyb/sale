import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpAccordionModule } from '../../theme/components/accordion/accordion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { CategoryManagmentItemComponent } from './category-managment/category-managment-item/category-managment-item.component';
import { CategoryManagmentRoutingModule } from './category-routing.module';
import { VpCardModule } from '../../theme/components/card/card.module';

@NgModule({
    declarations: [
        CategoryManagmentComponent,
        CategoryManagmentItemComponent
    ],
    imports: [
        CommonModule,
        CategoryManagmentRoutingModule,
        ReactiveFormsModule,
        VpAccordionModule,
        VpCardModule,
    ]
})
export class CategoryManagmentModule { }
