import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Shared/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private HttpClient: HttpClient) {}

  GetExams(): Observable<any> {
    return this.HttpClient.get(
      `${environment.BaseUrl}api/Student/GetAvailableExams`
    );
    //http://localhost:4453/api/Student/GetAvailableExams
  }

  ViewResult(examId: any, studentId: any): Observable<any> {
    return this.HttpClient.get(
      `${environment.BaseUrl}api/viewResult/${examId}/${studentId}`
    );
  }

  GetExam(examId: number): Observable<any> {
    return this.HttpClient.get(
      `${environment.BaseUrl}api/Student/TakeExam/${examId}`
    );
  }

  submitExamAnswers(body: {
    StudentID: any;
    ExamID: any;
    StartedAt: any;
    SubmittedAt: any;
    StudentAnswerDTOList: { QuestionID: any; StudentQuestionAnswer: any }[];
  }): Observable<any> {
    return this.HttpClient.post(
      `${environment.BaseUrl}api/Student/submit`,
      body
    );
  }

  CheckStdExam(ExamID: number, StdId: string): Observable<any> {
    return this.HttpClient.get(
      `${environment.BaseUrl}api/Student/Check/${ExamID}/${StdId}`
    );
  }
}
