import { CategoriesAllComponent } from './categories-all/categories-all.component';
import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  component: CategoriesAllComponent},
  { path: ':category',  component: CategoriesShowComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
