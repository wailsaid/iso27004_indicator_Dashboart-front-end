import { Component, OnInit } from '@angular/core';
import { User,UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users : User[] = [];
  constructor(private userService : UsersService){}

  ngOnInit():void{
    this.userService.getUsers().subscribe((data)=>this.users = data);
  }


  deleteUser(id: number) {
  this.userService.deleteUser(id);
  console.log(id);

  }
}
