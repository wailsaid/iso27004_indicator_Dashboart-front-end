import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { host } from 'src/app/app.component';
import { Indicator } from '../indicator-Evaluation/indicator.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private url: string = `http://${host}:8080/api/v1/depr`;
  constructor(private http: HttpClient) { }
  getDeps(): Observable<Departement[]> {

    return this.http.get<Departement[]>(this.url).pipe(share());
  }

  addDep(d: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.url, d).pipe(share());
  }
  delDep(d: Departement): Observable<Departement> {
    return this.http.delete<Departement>(`${this.url}/${d.id}`).pipe(share());
  }
}

export interface Departement {
  id?: number,
  name?: string,
  indicators?: Indicator[]
}