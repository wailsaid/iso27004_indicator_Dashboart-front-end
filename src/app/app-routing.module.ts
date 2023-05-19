import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import LoginComponent from './component/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './gaurd/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { AppsComponent } from './component/apps/apps.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { IndicatorDetailsComponent } from './component/indicator-details/indicator-details.component';
import { IndicatorComponent } from './component/indicators/indicators.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'indicator', component: IndicatorComponent },
  { path: 'indicator/:id', component: IndicatorDetailsComponent },
  { path: 'apps', component: AppsComponent }
]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
