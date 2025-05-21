import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/login-servicee.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-teacher-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './teacher-nav.component.html',
  styleUrl: './teacher-nav.component.css'
})
export class TeacherNavComponent {
private readonly loginservice = inject(LoginService)

Logout():void{
  this.loginservice.logOut();
}
}
