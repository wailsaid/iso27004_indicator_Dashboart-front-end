import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Departement, DepartementService } from 'src/app/service/depart/departement.service';
import { IndicatorService } from 'src/app/service/indicator-Evaluation/indicator.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit, OnDestroy {



  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;

  allDeps: Departement[] = []
  constructor(private departementService: DepartementService, private evaluService: IndicatorService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }

  eval !: Map<string,number> ;

  ngOnInit(): void {
    this.sub1 = this.departementService.getDeps().subscribe(data => {
      this.allDeps = data
      console.log(this.allDeps);
    });

  }

  depname: string = '';
  addDep() {
    const dep: Departement = {
      name: this.depname
    }
    this.sub2 = this.departementService.addDep(dep).subscribe(d => {
      this.allDeps.push(d);
      this.depname = '';
    });
  }
  deleteDep(_dep: Departement) {
    this.sub3 = this.departementService.delDep(_dep).subscribe(_ =>
      this.allDeps = this.allDeps.filter(a => a.id !== _dep.id))
  }

}
