import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const antiAuthGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !='undefined'){
    const router = inject(Router);
  if(localStorage.getItem("userToken")!=null){
  
    if(localStorage.getItem("userRole")=="Student"){
 router.navigate(["/S/home"])
      return false;
    }
     if(localStorage.getItem("userRole")=="Teacher"){
 router.navigate(["/T/home"])
      return false;
    }

   
    }
    return true;
  }else{
    return false;
  }
  
};
