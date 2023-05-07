import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  private url :string = "http://localhost:8080/api/v1/app";

  constructor(private http : HttpClient) { }

  getApps(): Observable<App[]>{
    return this.http.get<App[]>(this.url);
  }

}

export interface App {
  id : number,
  name: string
}
