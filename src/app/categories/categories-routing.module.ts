import { CategoriesPopularComponent } from './categories-popular/categories-popular.component';
import { CategoriesLastComponent } from './categories-last/categories-last.component';
import { CategoriesAllComponent } from './categories-all/categories-all.component';
import { CategoriesShowComponent } from './categories-show/categories-show.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  component: CategoriesAllComponent},
  { path: 'recent', component: CategoriesLastComponent },
  { path: 'popular', component: CategoriesPopularComponent },
  { path: ':category',  component: CategoriesShowComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
