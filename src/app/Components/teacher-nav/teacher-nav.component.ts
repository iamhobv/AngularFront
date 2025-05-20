import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/login-servicee.service';

@Component({
  selector: 'app-teacher-nav',
  imports: [],
  templateUrl: './teacher-nav.component.html',
  styleUrl: './teacher-nav.component.css'
})
export class TeacherNavComponent {
private readonly loginservice = inject(LoginService)

Logout():void{
  this.loginservice.logOut();
}
}
