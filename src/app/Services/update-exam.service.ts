import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Shared/environment';


@Injectable({
  providedIn: 'root'
})
export class UpdateExamService {

  constructor(private _HttpClient:HttpClient) { }

     
   ShowExamById(id:number):Observable<any>{
      return this._HttpClient.get(`${environment.BaseUrl}api/Student/TakeExam/${id}`)
     }
     

   EditExam(ExamId:number,Exam:any):Observable<any>{
    return this._HttpClient.put(`${environment.BaseUrl}api/Exam/${ExamId}`,Exam)
   }
  
}
