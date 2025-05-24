import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Shared/environment';

@Injectable({
  providedIn: 'root'
})
export class AddExamService {

  constructor(private _HttpClient:HttpClient) { }

    AddExam(Exam:any):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}api/Exam`,Exam)
   }

   AddQuestion(question: any): Observable<any> {
   return this._HttpClient.post(`${environment.BaseUrl}api/Question/addQuestion`, question);
   }
   
}
