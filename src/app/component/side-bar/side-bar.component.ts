//import * as $ from 'jquery';
import { AfterViewInit,Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit{

   constructor(public authService : AuthService,
    private router : Router,
    private authservice:AuthService){}

  logout(): void {
    this.authService.logout();
    // Redirect to the login page or any other appropriate action
    this.router.navigate(['/login']);
  }






  ngAfterViewInit() {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {

      $("#page-top").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").hide();
      }
    })

}
}
