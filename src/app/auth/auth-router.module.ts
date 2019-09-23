import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginInlineComponent } from '../auth/login-inline/login-inline.component';
import { UpdatePasswordComponent } from '../auth/update-password/update-password.component';
import { ForgotEmailVerifyComponent } from '../auth/forgot-email-verify/forgot-email-verify.component';




const routes: Routes = [
  { path: 'signin', component: LoginInlineComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotEmailComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'forgot-email/verify', component: ForgotEmailVerifyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
