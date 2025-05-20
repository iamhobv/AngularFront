import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const TeacherRoleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

if(localStorage.getItem("userToken")!=null&&localStorage.getItem("userRole")!=null){
  if(localStorage.getItem("userRole")=="Teacher"){
    return true;
  }
    }
router.navigate(["/S/home"])
    return false;
};
