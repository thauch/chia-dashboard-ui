import { FarmersComponent } from './farmers/farmers.component';
import { PlottersComponent } from './plotters/plotters.component';
import { PlottersDrivesComponent } from './plotters-drives/plotters-drives.component';
import { PlottersDetailsComponent } from './plotters-details/plotters-details.component';
import { HPoolDashboardComponent } from './hpool-dashboard/hpool-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SatelliteListComponent} from './satellite-list/satellite-list.component';
import {ProfileComponent} from './profile/profile.component';
import {SharedDashboardComponent} from './shared-dashboard/shared-dashboard.component';
import { HarvestersComponent } from './harvesters/harvesters.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', data: { titleSuffix: 'Login' } },
  { path: 'satellites', component: SatelliteListComponent, pathMatch: 'full', data: { titleSuffix: 'Satellites' } },
  { path: 'plotters/summary', component: PlottersComponent, pathMatch: 'full', data: { titleSuffix: 'Plotters Summary' } },
  { path: 'plotters/details', component: PlottersDetailsComponent, pathMatch: 'full', data: { titleSuffix: 'Plotters Details' } },
  { path: 'plotters/drives', component: PlottersDrivesComponent, pathMatch: 'full', data: { titleSuffix: 'Plotters Drives' } },
  { path: 'harvesters/summary', component: HarvestersComponent, pathMatch: 'full', data: { titleSuffix: 'Harvesters Summary' } },
  { path: 'farmers/summary', component: FarmersComponent, pathMatch: 'full', data: { titleSuffix: 'Farmers Summary' } },
  { path: 'hpool', component: HPoolDashboardComponent, pathMatch: 'full', data: { titleSuffix: 'HPool' } },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full', data: { titleSuffix: 'Profile' } },
  { path: 'shared/:shareKey', component: SharedDashboardComponent, pathMatch: 'full' },
  { path: 'oauth', loadChildren: () => import('./oauth/oauth.module').then(m => m.OAuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
