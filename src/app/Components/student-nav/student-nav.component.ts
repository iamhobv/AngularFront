import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/login-servicee.service';

@Component({
  selector: 'app-student-nav',
  imports: [],
  templateUrl: './student-nav.component.html',
  styleUrl: './student-nav.component.css'
})
export class StudentNavComponent {
private readonly loginservice = inject(LoginService)

Logout():void{
  this.loginservice.logOut();
}
}
