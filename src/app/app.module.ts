import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';


import { AppsComponent } from './component/apps/apps.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { IndicatorDetailsComponent } from './component/indicator-details/indicator-details.component';
import { IndicatorComponent } from './component/indicators/indicators.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { UserComponent } from './component/user/user.component';


import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { DepartementComponent } from './component/departement/departement.component';
import { HomeComponent } from './component/home/home.component';
import LoginComponent from './component/login/login.component';
import { AuthInterceptor, ErrorInterceptor } from './gaurd/auth.guard';

/* const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'indicator', component: IndicatorComponent },
  { path: 'indicator/:id', component: IndicatorDetailsComponent },
  { path: 'apps', component: AppsComponent }
]; */


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TopBarComponent,
    DashboardComponent,
    UserComponent,
    IndicatorComponent,
    AppsComponent,
    IndicatorDetailsComponent,
    LoginComponent,
    HomeComponent,
    DepartementComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MatSnackBarModule,

    NgxEchartsModule.forRoot({
      echarts
    }),

  //  RouterModule.forRoot(routes),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },  {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
