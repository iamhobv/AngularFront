import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const antiAuthGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !='undefined'){
    const router = inject(Router);
  if(localStorage.getItem("userToken")!=null){
  
    router.navigate(["/home"])
      return false;
    }
    return true;
  }else{
    return false;
  }
  
};
