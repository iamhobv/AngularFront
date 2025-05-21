import { Component } from '@angular/core';
import { ShowAllExamsComponent } from "../../Components/Teacher/show-all-exams/show-all-exams.component";

@Component({
  selector: 'app-teacher-home',
  imports: [ShowAllExamsComponent],
  templateUrl: './teacherHome.component.html',
  styleUrl: './teacherHome.component.css'
})
export class TeacherHomeComponent {

}
