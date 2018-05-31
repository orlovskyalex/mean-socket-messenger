import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { GuestGuard } from './shared/auth/guest.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivateChild: [GuestGuard],
  },
  {
    path: '',
    loadChildren: () => CoreModule,
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
