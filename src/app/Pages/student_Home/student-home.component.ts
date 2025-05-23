import { Component } from '@angular/core';
import { StudentAvailableExamsComponent } from "../../Components/Stuent/student-available-exams/student-available-exams.component";

@Component({
  selector: 'app-student-home',
  imports: [StudentAvailableExamsComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

}
