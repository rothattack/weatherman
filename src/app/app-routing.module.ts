import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { WeatherComponent } from './weather/weather.component';
import CanActivateRoute from './core/services/can-activate-route/can-activate-route.service';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    component: HomeComponent,
  },
  {
    path: 'detail',
    component: WeatherComponent,
    canActivate: [CanActivateRoute],
    loadChildren: () =>
      import('./weather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [CanActivateRoute],
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
