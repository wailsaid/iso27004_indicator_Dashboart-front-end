import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Evaluation, IndicatorService } from 'src/app/service/indicator-Evaluation/indicator.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  generatePDF() {
    const options = {
      filename: 'angular-demo.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        margins: { bottom: 20 }
      }
    };

    const element = document.getElementById('pdf'); // Replace 'pdf' with the ID of the HTML element you want to convert

    html2pdf()
      .set(options)
      .from(element)
      .save();
  }

  dd() {

  }

  constructor(private indicatorservice: IndicatorService) { }
  //indicators: {s : number}={s=7};
  indicatorsList: Evaluation[] = [];

  ngOnInit(): void {
    this.indicatorservice.getDashboard().subscribe(data => this.indicatorsList = data);
  }


}
