import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsComponent } from './component/apps/apps.component';
import { CollectionComponent } from './component/collection/collection.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DepDetailComponent } from './component/dep-detail/dep-detail.component';
import { DepartementComponent } from './component/departement/departement.component';
import { HomeComponent } from './component/home/home.component';
import { IndicatorDetailsComponent } from './component/indicator-details/indicator-details.component';
import { IndicatorComponent } from './component/indicators/indicators.component';
import LoginComponent from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { AuthGuard } from './gaurd/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'indicator', component: IndicatorComponent },
      { path: 'indicator/:id', component: IndicatorDetailsComponent },
      { path: 'apps', component: AppsComponent },
      { path: 'departement', component: DepartementComponent },
      { path: 'departement/:id', component: DepDetailComponent },
      { path: 'evaliation-task', component: CollectionComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
