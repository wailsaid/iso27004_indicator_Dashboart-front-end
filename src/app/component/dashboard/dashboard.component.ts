import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Evaluation, IndicatorService } from 'src/app/service/indicator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  evaluations: Evaluation[] = [];
  constructor(private indicatorService: IndicatorService) { }


  private sub !: Subscription;
  ngOnInit(): void {
    this.sub = this.indicatorService.getDashboard().subscribe(data => this.evaluations = data);

  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}