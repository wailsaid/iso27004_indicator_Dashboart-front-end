import { Injectable } from '@angular/core';
import { App } from '../apps/apps.service';
import { HttpClient } from '@angular/common/http';
import { Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private url: string = "http://localhost:8080/api/v1/indicator";
  private evaluationURL: string = "http://localhost:8080/api/v1/evaluation";
  private downloadURL: string = "http://localhost:8080/generate-pdf";

  constructor(private http: HttpClient) { }

  getALLIndicator(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.url).pipe(share());

  }
  getRIndicator(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`${this.url}/not-evaluated`).pipe(share());
  }


  getIndicator(id: number): Observable<Indicator> {

    return this.http.get<Indicator>(`${this.url}/${id}`).pipe(share());

  }

  addIndicator(indicator: Indicator): Observable<Indicator> {
    return this.http.post<Indicator>(this.url, indicator).pipe(share());

  }


  getEvalaution(indicatorID?: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.evaluationURL}/${indicatorID}`).pipe(share());
  }
  getAllEvalautions(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.evaluationURL).pipe(share());
  }
  getAllEvalautionID(indicatorID?: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.evaluationURL}/all/${indicatorID}`).pipe(share());
  }

  Evaluate(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.evaluationURL, evaluation).pipe(share());
  }


  deleteIndicator(indicator: Indicator): Observable<Indicator> {
    return this.http.delete<Indicator>(`${this.url}/${indicator.id}`).pipe(share());
  }

  editIndicator(indicator: Indicator): Observable<Indicator> {

    indicator.checked = !indicator.checked;
    return this.http.put<Indicator>(this.url, indicator).pipe(share());
  }

  getDashboard(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.evaluationURL}/dashboard`).pipe(share());

  }
  
  getPDF(){
  return this.http.get(this.downloadURL,{
  responseType:'blob'
  })
  }
}


export interface Indicator {
  id?: number
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
  id?: number,
  value: number,
  performance?: number,
  evaluationDate: Date,
  status?: string,
  nextEvaluationDate?: Date,
  indicator: Indicator

}
