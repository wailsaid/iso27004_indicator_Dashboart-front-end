import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  username: string = "";
  email: string = "";
  password: string = "";
  role: string = "user";


  users: User[] = [];
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => this.users = data);
  }


  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => this.users = this.users.filter(u => u.id !== user.id));
  }

  addUser() {
        const nuser: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role    }

    this.userService.createUser(nuser).subscribe((u)=>{
      this.users.push(u);
      this.username ="";
      this.email ="";
      this.role ="user";
      this.password ="";
    });


  }


}
