import { Component, OnInit } from '@angular/core';
import { Departement, DepartementService } from 'src/app/service/depart/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {



  allDeps: Departement[] = []
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.departementService.getDeps().subscribe(data => {this.allDeps = data
    console.log(this.allDeps);
    });

  }

  depname : string = '';
  addDep() {
    const dep : Departement = {
      name : this.depname
    }
    this.departementService.addDep(dep).subscribe(d => {
      this.allDeps.push(d);
      this.depname = '';
    });
  }
  deleteDep(_dep : Departement) {
this.departementService.delDep(_dep).subscribe(_=>this.allDeps=this.allDeps.filter(a=> a.id !== _dep.id))  }
}
