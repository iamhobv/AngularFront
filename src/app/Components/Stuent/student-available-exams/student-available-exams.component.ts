import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { IShowExamsToTeacher } from '../../../Models/ishow-exams-to-teacher';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-available-exams',
  imports: [RouterLink],
  templateUrl: './student-available-exams.component.html',
  styleUrl: './student-available-exams.component.css'
})
export class StudentAvailableExamsComponent implements OnInit {

  // examData: IShowExamsToTeacher[] = [];
  examStart: IShowExamsToTeacher[] = [];
  examEnded: IShowExamsToTeacher[] = [];

  constructor(private _StudentService: StudentService) {

  }
  studentId: any;
  ngOnInit(): void {
    this._StudentService.GetExams().subscribe({
      next: (res) => {
        // this.examData = res.data;
        this.studentId = localStorage.getItem('userId');
        
        res.data.forEach((element: IShowExamsToTeacher) => {
          this._StudentService.CheckStdExam(element.id, this.studentId).subscribe({
            next: (result) => {
              if (result.isPass) {
                this.examStart.push(element)
              } else {
                this.examEnded.push(element)
              }
            }
          })

        });
      },
      error: (err) => {
        // console.log(err);
      }
    })
  }






}
