import { Component } from '@angular/core';
import { BlankNavbarComponent } from "../../Components/blank-navbar/blank-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  imports: [BlankNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
