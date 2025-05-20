import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../Components/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Components/footer/footer.component";
import { BlankNavbarComponent } from "../../Components/blank-navbar/blank-navbar.component";

@Component({
  selector: 'app-student-layout',
  imports: [AuthNavbarComponent, RouterOutlet, FooterComponent, BlankNavbarComponent],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class AuthLayoutComponent {

}
