import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { host } from 'src/app/app.component';
import { User } from '../user/users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  getAuthToken() {
    return localStorage.getItem('token');
  }


  private apiUrl = `http://${host}:8080/auth`;

  constructor(private http: HttpClient) { }

  login(request: AuthResquest) {
    /*  authreq : AuthResquest ={ username, password }); */

    return this.http.post<AuthResponse>(this.apiUrl, request).pipe(share());//.subscribe(data => {
    //console.log(data);
    // } );
  }

  isAdmin(): boolean {
    var userString = localStorage.getItem('user');
    if (userString) {
      var user: User = JSON.parse(userString);
      if (user.role === "ADMIN") {
        return true ;
      }
    }
    return false;
  }

  isCollector(): boolean {
    var userString = localStorage.getItem('user');
    if (userString) {
      var user: User = JSON.parse(userString);
      if (user.role === "COLLECTOR") {
        return true ;
      }
    }
    return false;
  }

  isAuthenticated(): boolean {
    // Check if the token exists and is not expired
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export interface AuthResquest {
  username: string,
  password: string
}

export interface AuthResponse {
  token: string,
  user: User
}