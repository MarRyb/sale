import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  component: CategoriesShowComponent},
  { path: ':category',  component: CategoriesShowComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
