import { HttpClientModule } from '@angular/common/http';
import { ILogin } from './../../Models/ilogin';
import { LoginService } from './../../Services/login-servicee.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent   {





loginForm = new FormGroup({
  username:new FormControl("",[Validators.required,Validators.minLength(3)]),
  password:new FormControl("",[Validators.required,Validators.minLength(8)]),
})
/**
 *
 */
constructor( private loginService:LoginService ) {

  
}
  

get getUsername() {
    return this.loginForm.controls['username'];
  }
get getPassword() {
    return this.loginForm.controls['password'];
  }
  
mb20px:boolean = true;
error:boolean = false;
  private readonly router = inject(Router);

LoginSubmit(){
if(this.loginForm.status=="VALID"){

  console.log("clicked");
  const loginCred = {username:"",password:""} as ILogin; 
  loginCred.username = this.loginForm.value.username ?? "";
  loginCred.password = this.loginForm.value.password ?? "";

  this.loginService.login(loginCred).subscribe({
    next:(result)=>{
      console.log("logged in ");
      // console.log(result);
       setTimeout(() => {
console.log(result.data.token);
        localStorage.setItem("userToken",result.data.token)

this.loginService.getUserToken();


          this.router.navigate(["/home"])
        }, 1000);
      if(result.isPass == false){
          this.error=true;
      }
    },
    error:(e)=>{
      console.log("error");
      console.log(e);
    }
  })
  this.error=false;
}else{
  
  console.log("Error");
  this.error=true;
}

}



}