import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';

const routes: Route[] = [
    {
        path: 'managment',
        component: CategoryManagmentComponent
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
