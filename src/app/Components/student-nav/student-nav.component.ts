import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/login-servicee.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-student-nav',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './student-nav.component.html',
  styleUrl: './student-nav.component.css'
})
export class StudentNavComponent {
private readonly loginservice = inject(LoginService)

Logout():void{
  this.loginservice.logOut();
}
}
