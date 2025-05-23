import { IExamDetails } from './../../../Models/iexam-details';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowExamsToTeacherService } from './../../../Services/show-exams-to-teacher.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-details',
  imports: [RouterLink,CommonModule] ,
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent {
  examId:any;
  examData:IExamDetails= {
    examTitle: '',
    studentResults: [],
    totalStudents: 0
  };

  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private examDetailsService:ShowExamsToTeacherService
   ){}

  ngOnInit(): void {
   this.examId=this._ActivatedRoute.snapshot.paramMap.get('id');
      this.examDetailsService.GetExamById(this.examId).subscribe({
      next: (res) => {
        this.examData = res.data;
        console.log(res)
      },
    });
  }

 getDuration(startedAt: string, submittedAt: string): string {
    const start = new Date(startedAt);
    const end = new Date(submittedAt);
    const duration = new Date(end.getTime() - start.getTime());
    return `${duration.getMinutes()} Minute`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}