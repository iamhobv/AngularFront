import { Component, OnInit } from '@angular/core';
import { ShowExamsToTeacherService } from '../../../Services/show-exams-to-teacher.service';

@Component({
  selector: 'app-show-all-exams',
  imports: [],
  templateUrl: './show-all-exams.component.html',
  styleUrl: './show-all-exams.component.css'
})
export class ShowAllExamsComponent implements OnInit{

  examData:object[]=[]
   
  constructor(private _ShowExamsToTeacherService :ShowExamsToTeacherService){
  }

ngOnInit(): void {
  this._ShowExamsToTeacherService.GetExams().subscribe({
    next:(res)=>{ 
      this.examData=res.result;
    },
    error:(err)=>{
      console.log(err);

    }
  })
}

}
