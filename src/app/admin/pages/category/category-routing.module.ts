import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { CustomFieldManagmentComponent } from './custom-field-managment/custom-field-managment.component';

const routes: Route[] = [
    {
        path: 'managment',
        component: CategoryManagmentComponent
    },
    {
        path: 'custom-field',
        component: CustomFieldManagmentComponent
    },
    {
        path: '',
        redirectTo: 'managment',
        pathMatch: 'full',
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryManagmentRoutingModule { }
