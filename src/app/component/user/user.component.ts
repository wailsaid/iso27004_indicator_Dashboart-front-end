import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User, UsersService } from 'src/app/service/user/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  username!: string;
  email!: string;
  password!: string;
  role: string = "USER";

  users: User[] = [];

  private sub1 !: Subscription;
  private sub2 !: Subscription;
  private sub3 !: Subscription;
  private sub4 !: Subscription;
  constructor(private userService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub1 = this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from the getUsersSubscription to clean up the subscription
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
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
      if (u.role === 'COLLECTOR') {
        this.userService.setCollector(
          {
            collector: {
              id: u.id,
              username: u.username,
              password: u.password,
              role: u.role,
              email: u.email
            },
            indicator: []
          }
        ).subscribe();
      }
      this.users.push(u);
      this.username = "";
      this.email = "";
      this.role = "USER";
      this.password = "";
    });


  }


 newPass : string = "";

 ResetPassword(user : User){

  this.sub4 = this.userService.RestUserP(user.id,this.newPass).subscribe(_=>{
    this.newPass ="";
    this.snackBar.open("new password is set", 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });
  })
 }


  Picon: string = "fa-eye";
  passwordInput: string = "password";

  toggleP() {
    if (this.passwordInput === "password") {
      this.passwordInput = "text";
      this.Picon = "fa-eye-slash";

    } else {
      this.passwordInput = "password";
      this.Picon = "fa-eye";

    }
  }
}
