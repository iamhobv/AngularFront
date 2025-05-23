import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Shared/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowExamsToTeacherService {

  constructor(private _HttpClient:HttpClient) {
   }

   GetExams():Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}api/Exam`)
   } 

   
   GetExamById(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}api/Exam/results/${id}`)
   }

   deleteExam(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.BaseUrl}api/Exam/${id}`)
   }

   AddExam(Exam:any):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}api/Exam`,Exam)
   }

   
  //  EditExam(ExamId:number,Exam:any):Observable<any>{
  //   return this._HttpClient.put(`${environment.BaseUrl}api/Exam/${ExamId}`,Exam)
  //  }
}
