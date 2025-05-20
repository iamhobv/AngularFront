import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const StudentRoleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

if(localStorage.getItem("userToken")!=null&&localStorage.getItem("userRole")!=null){
  if(localStorage.getItem("userRole")=="Student"){
    return true;
  }
    }
router.navigate(["/T/home"])
    return false;
};
