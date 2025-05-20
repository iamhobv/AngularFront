import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../Models/ilogin';

@Injectable({
  providedIn: 'root'
})

export class registerService {
/**
 *
 */
constructor() {  
}

private readonly http = inject(HttpClient);
baseURL : string = 'http://studentexam.runasp.net/api/api/Account/Register';
register(registerForm:any):Observable<any>{
  return this.http.post<any>(this.baseURL,registerForm);
}



}

