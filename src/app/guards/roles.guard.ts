import { CanActivateFn, Router } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const _AuthenaticationService = inject(AuthenaticationsService);
  const _Router = inject(Router);
  let user: any = _AuthenaticationService.loggedInUser.getValue();
  if (user.role !== 'manager'){
    alert('You are not allowed to access this route');
    _Router.navigate(['/home']);
    return false;
  }
  else {
    return true;
  }
};
