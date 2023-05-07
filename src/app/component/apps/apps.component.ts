import { Component } from '@angular/core';
import { App,AppsService } from 'src/app/service/apps.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent {

  apps: App[] = [];


constructor (private appsService : AppsService){}

ngOnInit():void{
this.appsService.getApps().subscribe((data)=> this.apps = data);
}


}
