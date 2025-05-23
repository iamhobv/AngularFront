import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const TeacherRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const allowedRoles = ['TopAdmin', 'Teacher'];

  var userRole = localStorage.getItem('userRole');

  // console.log('user inside guard' + userRole);

  // console.log('inside guard');

  if (localStorage.getItem('userToken') != null) {
    //localStorage.getItem('userToken') != null && userRole != null
    if (allowedRoles.includes('Teacher')) {
      // console.log('inside if if' + allowedRoles.includes(userRole));
      return true;
    }
  }
  router.navigate(['/S/home']);
  // console.log('inside if if' + allowedRoles.includes(userRole!));
  return false;
};
