import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-result',
  imports: [FormsModule,CommonModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css'
})
export class ViewResultComponent implements OnInit {

  exam:any;
  examId:any;
  studentId:any;
  examQuestionCount!:Number;
  constructor(private _studentService:StudentService,private activatedRoute:ActivatedRoute)
  {}
  ngOnInit(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get("examId");
    this.studentId = localStorage.getItem('userId');
    this._studentService.ViewResult(this.examId,this.studentId).subscribe({
      next:(res)=>{
        this.exam = res.data;
        console.log(this.exam)
        this.examQuestionCount = this.exam.questions.length
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  


}
