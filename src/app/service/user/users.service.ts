import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { host } from "src/app/app.component";
import { Indicator } from "../indicator-Evaluation/indicator.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = `http://${host}:8080/api/v1/user`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

      return this.http.get<User[]>(this.url).pipe(share());

  }
  setCollector(c: Collector){
    return this.http.post(`${this.url}/collector`,c).pipe(share());
  }

  getCollectors():Observable<Collector[]>{
    return this.http.get<Collector[]>(`${this.url}/collector`).pipe(share())

  }

  getCollector(id: number | undefined) {
    return this.http.get<Collector>(`${this.url}/collector/${id}`).pipe(share())
  }
  deleteUser(user: User): Observable<User> {
      return this.http.delete<User>(`${this.url}/${user.id}`).pipe(share());

    }


  private user$ : Observable<User> | undefined;
  createUser(newuser: User): Observable<User> {
    return this.user$ = this.http.post<User>(this.url, newuser).pipe(share());


  }
}

export interface User {
  id?: number,
  username: string,
  email: string,
  password?: string,
  role: string
}

export interface Collector{
  id?: number,
  collector : User,
  indicator : Indicator[]
}