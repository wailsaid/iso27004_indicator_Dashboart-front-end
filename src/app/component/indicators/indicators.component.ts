import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { App, AppsService } from 'src/app/service/apps/apps.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Evaluation, Indicator, IndicatorService } from 'src/app/service/indicator-Evaluation/indicator.service';


@Component({
  selector: 'app-indicator',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css'],


})
export class IndicatorComponent implements OnInit, OnDestroy {


  active = 1;
  active2 = 1;

  handleNextPrevClick(stepper: number, a: number) {
    if (stepper === 1) {
      this.active = a;
    } else if (stepper === 2) {
      this.active2 = a;
    }
  }











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


  //displayedColumns: string[] = ['id', 'name', 'category', 'type', 'acceptableValue', 'action'];


  indicators: Indicator[] = [];
  evals: Evaluation[] = [];



  constructor(private indicatorService: IndicatorService, private appsevice: AppsService, public authservice: AuthService) {

  }
  private sub1 !: Subscription;
  private sub2 !: Subscription;
  private sub3 !: Subscription;
  private sub4 !: Subscription;


  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }
  ngOnInit(): void {
    this.sub1 = this.indicatorService.getAllEvalautions().subscribe(data => {
      this.evals = data;
      this.sub2 = this.indicatorService.getRIndicator().subscribe(data => {this.indicators = data
      });
    });
  }


  listapp: App[] = [];
  loadData() {
    this.sub4 = this.appsevice.getApps().subscribe((apps) => this.listapp = apps);

  }



  addApp(a: App) {
    let index = this.apps.indexOf(a);
    if (index === -1) {
      this.apps.push(a);
      //console.log(this.apps);
      return;
    }
    delete this.apps[index];
   // console.log(this.apps);
  }


  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } */

  addIndicator() {

    const indicator: Indicator = {

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
    this.indicatorService.addIndicator(indicator).subscribe((i) => {
      this.indicators.push(i)


      this.name = "";
      this.type = "";
      this.category = "";
      this.acceptableValue = 0;
      this.targetValue = 0;
      this.description = "";
      this.howtomeasure = "";
      this.benefit = "";
      this.frequency = "monthly";
      this.valueUnit = "%";
      this.performance = "asc";
      this.infoOwner = "";
      this.infoCollector = "";
      this.infoCustomer = "";
      this.apps = [];
    });


  }


  edit(indicator: Indicator) {

    this.sub3 = this.indicatorService.editIndicator(indicator).subscribe();

  }

}
