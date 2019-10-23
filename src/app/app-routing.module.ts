import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        data: { showElemToAuth: false }
    },
    { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
    { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
    {
        path: 'vp-admin',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { showAdmin: true,  showElemToAuth: false }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
