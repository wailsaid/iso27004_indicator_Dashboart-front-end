import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/service/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {


  username: string = "";
  email: string = "";
  password: string = "";
  role: string = "user";

  users: User[] = [];

  private sub1 !: Subscription;
  private sub2 !: Subscription;
  private sub3 !: Subscription;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.sub1 = this.userService.getUsers().subscribe((data) => this.users = data);
  }
  ngOnDestroy(): void {
    // Unsubscribe from the getUsersSubscription to clean up the subscription
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }



  deleteUser(user: User) {
    this.sub2 = this.userService.deleteUser(user).subscribe(() => this.users = this.users.filter(u => u.id !== user.id));
  }

  addUser() {
    const nuser: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }

    this.sub3 = this.userService.createUser(nuser).subscribe((u) => {
      this.users.push(u);
      this.username = "";
      this.email = "";
      this.role = "user";
      this.password = "";
    });


  }


}
