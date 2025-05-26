import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
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
import { ExamDetailsComponent } from './Components/Teacher/exam-details/exam-details.component';

import { ViewResultComponent } from './Components/Stuent/view-result/view-result.component';
import { StudentAvailableExamsComponent } from './Components/Stuent/student-available-exams/student-available-exams.component';
import { StudentExamComponent } from './Components/Stuent/student-exam/student-exam.component';
import { StudentTakeExamComponent } from './Pages/student-take-exam/student-take-exam.component';
import { EditExamComponent } from './Components/Teacher/edit-exam/edit-exam.component';
import { NotFoundTeacherComponent } from './Pages/not-found-teacher/not-found-teacher.component';
import { NotFoundStudentComponent } from './Pages/not-found-student/not-found-student.component';


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
           {path:'ShowExamDetails/:id',component:ExamDetailsComponent,title:'Show Exams Details'},
           {path:'EditExam/:id',component:EditExamComponent,title:'Edit Exam'},


           { path: '**', component: NotFoundTeacherComponent ,title:'Error'}

    ]},

     {path:'S',component:StudentLayoutComponent ,canActivate:[authGuard,StudentRoleGuard],children:[
        
           {path:"",redirectTo:'home',pathMatch:"full"},
           {path:'home',component:StudentHomeComponent},
           {path:'takeExam/:examId',component:StudentTakeExamComponent},

           {path:'availableExams',component:StudentAvailableExamsComponent,title:'Available Exams'},
           {path:'ViewResult/:examId',component:ViewResultComponent,title:'Result'},

           { path: '**', component: NotFoundStudentComponent ,title:'Error'}

        
    ]},
    
   
];

