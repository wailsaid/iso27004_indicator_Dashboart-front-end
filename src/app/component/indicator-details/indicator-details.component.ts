import { Component, OnDestroy, OnInit } from '@angular/core';
import { Indicator, Evaluation, IndicatorService } from 'src/app/service/indicator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from 'src/app/service/apps.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.css']
})
export class IndicatorDetailsComponent implements OnInit, OnDestroy {

  chartOptions: any;
  loading = true;

  name: string = "";
  type: string = "";
  category: string = "";
  acceptableValue: number = 0;
  targetValue: number = 0;
  description: string = "";
  howtomeasure: string = "";
  benefit: string = "";
  frequency: string = "monthly";
  valueUnit: string = "%";
  performance: string = "asc";
  infoOwner: string = "";
  infoCollector: string = "";
  infoCustomer: string = "";
  apps: App[] = [];

  indicator !: Indicator;
  LatestEvaluation !: Evaluation;




  private sub1 !: Subscription;
  private sub2 !: Subscription;
  private sub3 !: Subscription;
  private sub4 !: Subscription;
  private sub5 !: Subscription;
  private sub6 !: Subscription;
  private sub7 !: Subscription;



  constructor(private route: ActivatedRoute, private router: Router, private indicatorService: IndicatorService) {



  }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe()
    this.sub2?.unsubscribe()
    this.sub3?.unsubscribe()
    this.sub4?.unsubscribe()
    this.sub5?.unsubscribe()
    this.sub6?.unsubscribe()
    this.sub7?.unsubscribe()

  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {

      this.sub1 = this.indicatorService.getIndicator(parseInt(idParam)).subscribe(i => {

        this.indicator = i;
        this.name = i.name;
        this.type = i.type;
        this.category = i.category;
        this.acceptableValue = i.acceptableValue;
        this.targetValue = i.targetValue;
        this.description = i.description;
        this.howtomeasure = i.howtomeasure;
        this.benefit = i.benefit;
        this.frequency = i.frequency;
        this.valueUnit = i.valueUnit;
        this.performance = i.performance;
        this.infoOwner = i.infoOwner;
        this.infoCollector = i.infoCollector;
        this.infoCustomer = i.infoCustomer;
        this.apps = i.apps;


        this.getLastEvaluation(parseInt(idParam));

      });

    } else {
      this.router.navigate(['indicator'])
    }

  }
  getLastEvaluation(id?: number) {
    this.sub2 = this.indicatorService.getEvalaution(id).subscribe((e) => {
      this.LatestEvaluation = e;
      this.getAllEvaluation(id);

    });
  }


  deleteIndicator() {
    this.sub3 = this.indicatorService.deleteIndicator(this.indicator).subscribe(() => {

      this.router.navigate(['indicator']);
    });
  }


  value: number = 0;

  evaluate() {
    const evaluate: Evaluation = {
      value: this.value,
      evaluationDate: new Date,
      indicator: this.indicator
    }
    this.sub7 = this.indicatorService.Evaluate(evaluate).subscribe((e) => {
      this.LatestEvaluation = e;
      this.value = 0;
      this.listEvaluation.unshift(e);
      this.loadData();
    });
  }


  listEvaluation: Evaluation[] = [];
  getAllEvaluation(id?: number) {
    this.sub6 = this.indicatorService.getAllEvalautionID(id).subscribe((l) => {
      this.listEvaluation = l;
      this.loadData();
    });

  }
  loadData() {
    this.loading = true;
    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: this.listEvaluation.reverse().map(evaluation => evaluation.evaluationDate.toString().substring(0, 10))
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Data Line',
          type: 'line',
          // smooth: true,
          color: this.getcolor() ,
          areaStyle: {},
          data: this.listEvaluation.map(evaluation => evaluation.value)
        },
        {
          name: 'Acceptable',
          type: 'line',
          smooth: true,
          color: "#5e8000b5",
          data: Array(this.listEvaluation.length + 1).fill(this.indicator.acceptableValue),
        },
        {
          name: 'Target value',
          type: 'line',
          color:"#008000c7",
          smooth: true,
          data: Array(this.listEvaluation.length + 1).fill(this.indicator.targetValue),
        }

      ],
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}', // Display the date (b) and value (c) in the tooltip
        axisPointer: {

        }
      },
    };
    this.listEvaluation.reverse();
    this.loading = false;
  }
  edit() {
    const indicator: Indicator = {
      id: this.indicator.id,
      name: this.name,
      type: this.type,
      category: this.category,
      acceptableValue: this.acceptableValue,
      targetValue: this.targetValue,
      description: this.description,
      howtomeasure: this.howtomeasure,
      benefit: this.benefit,
      frequency: this.frequency,
      valueUnit: this.valueUnit,
      performance: this.performance,
      infoOwner: this.infoOwner,
      infoCollector: this.infoCollector,
      infoCustomer: this.infoCustomer,
      checked: false,
      apps: this.apps
    }
    this.sub4 = this.indicatorService.editIndicator(indicator).subscribe((i) => {

      this.indicator = i;
      this.name = i.name;
      this.type = i.type;
      this.category = i.category;
      this.acceptableValue = i.acceptableValue;
      this.targetValue = i.targetValue;
      this.description = i.description;
      this.howtomeasure = i.howtomeasure;
      this.benefit = i.benefit;
      this.frequency = i.frequency;
      this.valueUnit = i.valueUnit;
      this.performance = i.performance;
      this.infoOwner = i.infoOwner;
      this.infoCollector = i.infoCollector;
      this.infoCustomer = i.infoCustomer;
      this.apps = i.apps;

      this.getLastEvaluation(i.id);
    });
  }


  checked(indicator: Indicator) {
    this.sub5 = this.indicatorService.editIndicator(indicator).subscribe();
  }

  getcolor() {
    switch (this.LatestEvaluation.status) {
      case 'Acceptable': return "#5e8000b5";
      case 'Target-achieved': return "#008000c7";
      case 'Bad': return "#e84949ab";

      default:
        return "#5e8000b5";
    }
  }
}
