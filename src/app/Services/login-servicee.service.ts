import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../Models/ilogin';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
/**
 *
 */
constructor() {  
}

private readonly router = inject(Router)


 userToken :any;
private readonly http = inject(HttpClient);
baseURL : string = 'http://studentexam.runasp.net/api/api/Account/login';
login(login:any):Observable<any>{
  return this.http.post<any>(this.baseURL,login);
}
getUserToken():void {
  if(localStorage.getItem("userToken")!=null){

    this.userToken=jwtDecode(localStorage.getItem("userToken")!)
    console.log(this.userToken);
  }
}

logOut():void{
  localStorage.removeItem("userToken");
  this.userToken=null;
this.router.navigate(["/login"]);
}


}

