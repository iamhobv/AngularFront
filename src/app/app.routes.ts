import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Pages/notfound/not-found.component';
import { LoginComponent } from './Pages/LogIn/login.component';
import { RegisterComponent } from './Pages/Register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './Guards/auth-gaurd.guard';
import { antiAuthGuard } from './Guards/anti-auth.guard';

export const routes: Routes = [
    { path:'',component:AuthLayoutComponent,canActivate:[antiAuthGuard],children:[
        {path:"",redirectTo:'login',pathMatch:"full"},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent}
    ]},

    {path:'',component:BlankLayoutComponent ,canActivate:[authGuard],children:[
        
           {path:"",redirectTo:'home',pathMatch:"full"},
            {path:'home',component:HomeComponent},
        
    ]},
    {path:'**',component:NotFoundComponent}
];

