import { registerService } from './../../Services/register-servicee.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( private registerService:registerService ) {}
  
  private readonly router = inject(Router);
  registerForm = new FormGroup({
  username:new FormControl("",[Validators.required,Validators.minLength(3)]),
  password:new FormControl("",[Validators.required,Validators.minLength(8)]),
   confirmPassword:new FormControl("",[Validators.required,Validators.minLength(8)]),
   email:new FormControl("",[Validators.required,Validators.email]),
   phoneNumber:new FormControl("",[Validators.required,Validators.pattern("^(\\+2)?(010|011|012|015)[0-9]{8}$")]),
   isTeacher:new FormControl()
})
error:boolean = false;
get getUsername() {
    return this.registerForm.controls['username'];
  }
  get getPassword() {
    return this.registerForm.controls['password'];
  }
  get getConfirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  get getEmail() {
    return this.registerForm.controls['email'];
  }
  get getPhoneNumber() {
    return this.registerForm.controls['phoneNumber'];
  }
  get getIsTeacher() {
    return this.registerForm.controls['isTeacher'];
  }

message!:string;

  RegisterSubmit(){
  if(this.registerForm.status=="VALID"){
  
    console.log("clicked");
    // Login:ILogin ={username:"",password:""}; 
    const registerCred = {username:"",password:"",confirmPassword:"",email:"",phoneNumber:"",isTeacher:false} ; 
    registerCred.username = this.registerForm.value.username ?? "";
    registerCred.password = this.registerForm.value.password ?? "";
    registerCred.confirmPassword = this.registerForm.value.confirmPassword ?? "";
    registerCred.email = this.registerForm.value.email ?? "";
    registerCred.phoneNumber = this.registerForm.value.phoneNumber ?? "";
    registerCred.isTeacher = this.registerForm.value.isTeacher ?? false;
  
    this.registerService.register(registerCred).subscribe({
      next:(result)=>{
        console.log("registered");
        console.log(result);

        setTimeout(() => {
          this.router.navigate(["/login"])
        }, 1000);
        
        if(result.isPass == false){
            this.error=true;
            this.message=result.data || result.data;
  
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
