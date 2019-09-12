import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component'
import {RegistrationComponent} from '../auth/registration/registration.component'

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotEmailComponent },
  // { path: 'update-password', component: UpdatePasswordComponent },
  // { path: 'forgot-email/verify', component: ForgotEmailVerifyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
