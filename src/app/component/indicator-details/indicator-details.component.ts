import { Component, OnInit } from '@angular/core';
import { Indicator, IndicatorService } from 'src/app/service/indicator.service';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.css']
})
export class IndicatorDetailsComponent implements OnInit {

  indicator !: Indicator ;

  constructor(private route: ActivatedRoute,private router:Router,private indicatorService:IndicatorService){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {

     this.indicatorService.getIndicator(parseInt(idParam)).subscribe(i => this.indicator = i);

    }else{
      this.router.navigate(['indicator'])
    }

  }

}
