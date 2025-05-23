import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-available-exams',
  imports: [RouterLink],
  templateUrl: './student-available-exams.component.html',
  styleUrl: './student-available-exams.component.css'
})
export class StudentAvailableExamsComponent implements OnInit {
//  examData:object[{  id: number,
//       title:string,
//       duration:number}]=[];
examData:any;
 constructor(private _StudentService :StudentService){
   }
  ngOnInit(): void {
    this._StudentService.GetExams().subscribe({
      next:(res)=>{ 
      this.examData=res.data;

      console.log(this.examData);
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }



  


}
