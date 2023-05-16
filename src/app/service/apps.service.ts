import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, share } from 'rxjs';


const httpOptions = {
  Headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  private url :string = "http://localhost:8080/api/v1/app";



  constructor(private http : HttpClient) { }

  getApps(): Observable<App[]>{
    return this.http.get<App[]>(this.url).pipe(share());
  }

  deleteApp(app :App) :Observable<App>{
   return  this.http.delete<App>(`${this.url}/${app.id}`).pipe(share());
  }

  CreateApp(newapp :App):Observable<App>{
    return this.http.post<App>(this.url,newapp).pipe(share());
  }

}

export interface App {
  id ?: number,
  name: string
}
