import { Routes } from '@angular/router';
import { RegisterComponent } from './_services/register/register.component';
import { authGuard } from './_guards/AuthGuard';
import { unsavedChangesGuard } from './_guards/UnsavedChangesGuard';
import { productResolver } from './_guards/ProductResolverGuard';
import { featureToggleGuard } from './_guards/FeatureToggleGuard';
import { LoginComponent } from './_services/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Landing page
  { path: 'login', component: LoginComponent }, // egar loading
  { path: 'register',    component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],  // ✅ functional guard
    loadComponent: () => import('./_services/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { roles: ['admin', 'manager'] } // role-based config
  },
  {
    path: 'edit-profile',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./_services/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'product/:id',
    resolve: { product: productResolver },
    loadComponent: () => import('./_services/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'new-dashboard',
    canMatch: [featureToggleGuard],
    loadComponent: () => import('./_services/new-dashboard/new-dashboard.component').then(m => m.NewDashboardComponent)
  },
  { 
    path: 'unauthorized',
    loadComponent: () => import('./_services/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
   { path: '**', redirectTo: '' }, // fallback
];
