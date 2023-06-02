import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { SideBarComponent } from './component/side-bar/side-bar.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { IndicatorComponent } from './component/indicators/indicators.component';
import { AppsComponent } from './component/apps/apps.component';
import { IndicatorDetailsComponent } from './component/indicator-details/indicator-details.component';


import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import LoginComponent from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthInterceptor, ErrorInterceptor } from './gaurd/auth.guard';
import { ReportComponent } from './component/report/report.component';

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
    ReportComponent,


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
