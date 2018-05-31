import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { GuestGuard } from './shared/auth/guest.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivateChild: [GuestGuard],
  },
  {
    path: 'messages',
    loadChildren: () => CoreModule,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'messages',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
