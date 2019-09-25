import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryHeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: CategoryHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
