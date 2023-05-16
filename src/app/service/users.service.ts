import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = "http://localhost:8080/api/v1/user";

  constructor(private http: HttpClient) { }

  private userList$: Observable<User[]> | undefined;
  getUsers(): Observable<User[]> {
    if (!this.userList$) {

      this.userList$ = this.http.get<User[]>(this.url).pipe(share());
    }
    return this.userList$;
  }

  private deleteuser$: Observable<User> | undefined;
  deleteUser(user: User): Observable<User> {
    if (!this.deleteuser$) {
      this.deleteuser$ = this.http.delete<User>(`${this.url}/${user.id}`).pipe(share());

    }
    return this.deleteuser$;
  }


  private user$ : Observable<User> | undefined;
  createUser(newuser: User): Observable<User> {
    if (!this.user$) {

     this.user$ = this.http.post<User>(this.url, newuser).pipe(share());
    }
    return this.user$;

  }
}

export interface User {
  id?: number,
  username: string,
  email: string,
  password: string,
  role: string
}
