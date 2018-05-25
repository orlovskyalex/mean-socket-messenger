import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { coreRoutes } from './core/core-routing';
import { CoreComponent } from './core/core.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { authRoutes } from './auth/auth-routing';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: authRoutes,
  },
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: coreRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
