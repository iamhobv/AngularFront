import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-student-available-exams',
  imports: [],
  templateUrl: './student-available-exams.component.html',
  styleUrl: './student-available-exams.component.css'
})
export class StudentAvailableExamsComponent implements OnInit {
 examData:object[]=[];
 constructor(private _StudentService :StudentService){
   }
  ngOnInit(): void {
    this._StudentService.GetExams().subscribe({
      next:(res)=>{ 
      this.examData=res.Data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  


}
