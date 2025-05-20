import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../Services/login-servicee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-blank-navbar',
  imports: [RouterLink,RouterLinkActive,FontAwesomeModule],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css'
})
export class BlankNavbarComponent {
private readonly loginservice = inject(LoginService)

Logout():void{
  this.loginservice.logOut();
}
}
