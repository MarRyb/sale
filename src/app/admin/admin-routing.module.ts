import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Route[] = [
    {
        path: '',
        component: AdminBaseComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
