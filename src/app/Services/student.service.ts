import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Shared/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private HttpClient:HttpClient) { }

  GetExams():Observable<any>{
    return this.HttpClient.get(`${environment.BaseUrl}api/GetAvailableExams`)
  }


  ViewResult(examId:any,studentId:any):Observable<any>{
    return this.HttpClient.get(`${environment.BaseUrl}api/viewResult/${examId}/${studentId}`)
  }

}
