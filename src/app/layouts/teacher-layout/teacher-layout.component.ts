import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Components/footer/footer.component";
import { TeacherNavComponent } from "../../Components/teacher-nav/teacher-nav.component";

@Component({
  selector: 'app-Teacher-layout',
  imports: [ RouterOutlet, FooterComponent, TeacherNavComponent],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css'
})
export class TeacherLayoutComponent {

}
