import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../Components/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
