import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './Pages/notfound/not-found.component';
import { LoginComponent } from './Pages/LogIn/login.component';
import { RegisterComponent } from './Pages/Register/register.component';
import { authGuard } from './Guards/auth-gaurd.guard';
import { antiAuthGuard } from './Guards/anti-auth.guard';
import { TeacherHomeComponent } from './Pages/teacher_Home/teacherHome.component';
import { StudentHomeComponent } from './Pages/student_Home/student-home.component';
import { StudentRoleGuard } from './Guards/Studentrole.guard';
import { TeacherRoleGuard } from './Guards/Teacherrole.guard';
import { TeacherLayoutComponent } from './layouts/teacher-layout/teacher-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';

import { AddExamComponent } from './Components/Teacher/add-exam/add-exam.component';
import { ShowAllExamsComponent } from './Components/Teacher/show-all-exams/show-all-exams.component';

import { ViewResultComponent } from './Components/Stuent/view-result/view-result.component';


export const routes: Routes = [
    { path:'',component:AuthLayoutComponent,canActivate:[antiAuthGuard],children:[
        {path:"",redirectTo:'login',pathMatch:"full"},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent}
    ]},

    
   {path:'T',component:TeacherLayoutComponent ,canActivate:[authGuard,TeacherRoleGuard],children:[
        
           {path:"",redirectTo:'home',pathMatch:"full"},
           {path:'home',component:TeacherHomeComponent,title:'Home'},
           {path:'AddExam',component:AddExamComponent,title:'Add Exam'},
           {path:'ShowExams',component:ShowAllExamsComponent,title:'Show Exams'},
           { path: '**', component: NotFoundComponent ,title:'Error'}

    ]},

     {path:'S',component:StudentLayoutComponent ,canActivate:[authGuard,StudentRoleGuard],children:[
        
           {path:"",redirectTo:'home',pathMatch:"full"},
           {path:'home',component:StudentHomeComponent},
           { path: '**', component: NotFoundComponent ,title:'Error'}

        
    ]},
    {
        path:'ViewResult',component:ViewResultComponent
    },
   
    {path:'**',component:NotFoundComponent}
];

