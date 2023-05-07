import { Injectable } from '@angular/core';
import { App } from './apps.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private url: string = "http://localhost:8080/api/v1/indicator";
  constructor(private http: HttpClient) { }

  getALLIndicator(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.url);

  }
  getIndicator(id : number):Observable<Indicator>{

    return this.http.get<Indicator>(`${this.url}/${id}`);

  }
}


export interface Indicator {
  id: number
  name: string,
  type: string,
  category: string,
  acceptableValue: number,
  targetValue: number,
  description: string,
  howtomeasure: string,
  benefit: string,
  frequency: string,
  valueUnit: string,
  peformence: string,
  infoOwner: string,
  infoCollector: string,
  infoCustomer: string,
  checked: boolean,
  apps: App[]
}