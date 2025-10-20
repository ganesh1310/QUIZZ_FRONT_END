import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('userRole');
  if(userRole === 'ADMIN') {
    return true;
  } else {
    alert('Access denied. Admins only.');
    router.navigate(['/unauthorized']);
    return false;
  }
};
