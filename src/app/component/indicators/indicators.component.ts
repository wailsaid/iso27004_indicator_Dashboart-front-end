import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { App } from 'src/app/service/apps.service';
import { Indicator, IndicatorService } from 'src/app/service/indicator.service';


@Component({
  selector: 'app-indicator',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorComponent implements AfterViewInit, OnInit {



  apps: App[] = [];


  displayedColumns: string[] = ['id', 'name', 'category', 'type', 'acceptableValue', 'action'];
  dataSource: MatTableDataSource<Indicator>;
  indicators: Indicator[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private indicatorService: IndicatorService) {
    this.dataSource = new MatTableDataSource();

  }
  ngOnInit(): void {
    this.indicatorService.getALLIndicator().subscribe(data => this.indicators = data);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.loadData();
  }

/*   loadData() {
    this.indicatorService.getALLIndicator().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.log(error);
      }
    );
  } */





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  indicatorDetails() {
    console.log(this.apps);

  }
}
