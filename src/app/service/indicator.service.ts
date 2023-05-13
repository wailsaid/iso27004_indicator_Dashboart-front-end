import { Injectable } from '@angular/core';
import { App } from './apps.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private url: string = "http://localhost:8080/api/v1/indicator";
  private evaluationURL: string = "http://localhost:8080/api/v1/evaluation";

  constructor(private http: HttpClient) { }

  getALLIndicator(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.url);

  }
  getRIndicator() :  Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`${this.url}/not-evaluated`);
  }


  getIndicator(id: number): Observable<Indicator> {

    return this.http.get<Indicator>(`${this.url}/${id}`);

  }

  addIndicator(indicator: Indicator): Observable<Indicator> {
    return this.http.post<Indicator>(this.url, indicator);

  }


  getEvalaution(indicatorID ?: number): Observable<Evaluation>{
    return this.http.get<Evaluation>(`${this.evaluationURL}/${indicatorID}`);
  }
  getAllEvalautions(): Observable<Evaluation[]>{
    return this.http.get<Evaluation[]>(this.evaluationURL);
  }
  getAllEvalautionID(indicatorID ?: number): Observable<Evaluation[]>{
    return this.http.get<Evaluation[]>(`${this.evaluationURL}/all/${indicatorID}`);
  }

  Evaluate(evaluation : Evaluation): Observable<Evaluation>{
    return this.http.post<Evaluation>(this.evaluationURL,evaluation);
  }


  deleteIndicator(indicator: Indicator): Observable<Indicator> {
    return this.http.delete<Indicator>(`${this.url}/${indicator.id}`);
  }

  editIndicator(indicator: Indicator): Observable<Indicator>  {

    indicator.checked = ! indicator.checked;
    return this.http.put<Indicator>(this.url,indicator);
  }

  getDashboard() :  Observable<Evaluation[]>{
    return this.http.get<Evaluation[]>(`${this.evaluationURL}/dashboard`)

  }
}


export interface Indicator {
  id ?: number
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
  performance: string,
  infoOwner: string,
  infoCollector: string,
  infoCustomer: string,
  checked: boolean,
  apps: App[]
}

export interface Evaluation {
  id ?: number,
  value: number,
  performance?: number,
  evaluationDate: Date,
  status ?:string,
  nextEvaluationDate ?: Date,
  indicator: Indicator

}