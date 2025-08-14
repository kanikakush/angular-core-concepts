import { Routes } from '@angular/router';
import { LoginComponent } from './_services/login/login.component';
import { RegisterComponent } from './_services/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    //{ path: '', component: LandingPageComponent }, // Landing page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // fallback
];
