import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User, UsersService } from 'src/app/service/user/users.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
alluser : User[] = []
  constructor(private us : UsersService){}
  ngOnInit(): void {
    this.us.getUsers().subscribe(data=>{
      this.alluser = data ;
      this.dtTrigger.next(data);
    })
  }
}
