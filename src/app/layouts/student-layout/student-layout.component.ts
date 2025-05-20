import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../Components/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Components/footer/footer.component";
import { StudentNavComponent } from "../../Components/student-nav/student-nav.component";

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, FooterComponent,  StudentNavComponent],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {

}
