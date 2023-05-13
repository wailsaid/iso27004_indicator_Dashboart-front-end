//import * as $ from 'jquery';
import { AfterViewInit,Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
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
