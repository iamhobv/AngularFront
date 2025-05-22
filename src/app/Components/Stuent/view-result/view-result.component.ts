import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-result',
  imports: [],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css'
})
export class ViewResultComponent implements OnInit {

  result:object[]=[];
  examId:any;
  studentId:any;
  constructor(private _studentService:StudentService,private activatedRoute:ActivatedRoute)
  {}
  ngOnInit(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get("examId");
    this.studentId = this.activatedRoute.snapshot.paramMap.get("studentId");
    this._studentService.ViewResult(this.examId,this.studentId).subscribe({
      next:(res)=>{
        this.result = res.Data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  


}
