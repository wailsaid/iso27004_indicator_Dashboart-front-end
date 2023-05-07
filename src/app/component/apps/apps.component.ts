import { Component, OnInit } from '@angular/core';
import { App, AppsService } from 'src/app/service/apps.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  appname !: string;

  apps: App[] = [];

  constructor(private appsService: AppsService,private location: Location) { }

  ngOnInit(): void {
    this.appsService.getApps().subscribe((data) => this.apps = data);
  }
  deleteApp(app: App) {
    this.appsService.deleteApp(app).subscribe(() =>
      this.apps = this.apps.filter(a => a.id !== app.id)
    );
  }
  addApp(){

    const app : App = {
      "name" : this.appname
    }
    this.appsService.CreateApp(app).subscribe((a)=>{
     this.apps.push(a);
      this.appname ="";
    });

  }



}
