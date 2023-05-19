import { Component, OnDestroy } from '@angular/core';
import { AuthResquest, AuthService } from 'src/app/service/Auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { error } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnDestroy {
  username!: string;
  password!: string;
  errorMessage!: string;

  sub1 !: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const request: AuthResquest = {
      username: this.username,
      password: this.password
    }
 this.sub1= this.authService.login(request).subscribe(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
       this.router.navigate(['/']);},
       error=>{
        this.errorMessage ="wrong credentials";
       });
  }
  ngOnDestroy(): void {
   this.sub1!.unsubscribe();
  }

}
