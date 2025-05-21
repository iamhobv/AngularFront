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

   deleteExam(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.BaseUrl}api/Exam/${id}`)
   }
}
