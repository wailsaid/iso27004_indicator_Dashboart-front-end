import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = "http://localhost:8080/api/v1/user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.url}/${user.id}`);
  }


  createUser(newuser : User):  Observable<User> {
    return this.http.post<User>(this.url,newuser);

  }
}

export interface User {
  id ?: number,
  username: string,
  email: string,
  password: string,
  role: string
}
