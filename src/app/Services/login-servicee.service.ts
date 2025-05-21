import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../Models/ilogin';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../Shared/environment';

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
 userName :any;
 userId :any;
 userRole :any;
private readonly http = inject(HttpClient);
// baseURL : string = 'http://studentexam.runasp.net';
login(login:any):Observable<any>{
  return this.http.post<any>(`${environment.BaseUrl}api/Account/login`,login);
}
getUserToken():void {
  if(localStorage.getItem("userToken")!=null){

    this.userToken=jwtDecode(localStorage.getItem("userToken")!)
    this.userName=this.userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    this.userId=this.userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    this.userRole=this.userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      localStorage.setItem("userName",this.userName);
        localStorage.setItem("userId",this.userId);
        localStorage.setItem("userRole",this.userRole);
    console.log(this.userToken);
    console.log(this.userName);
    console.log(this.userId);
    console.log(this.userRole);
  }
}

logOut():void{
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
  this.userToken=null;
this.router.navigate(["/login"]);
}


}

