import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';

export const authenaticationGuard: CanActivateFn = (route, state) => {

  const _AuthenaticationService = inject(AuthenaticationsService);
  const _Router = inject(Router);

  if (_AuthenaticationService.loggedInUser.getValue() !== null)
    return true;
  else {
    _Router.navigate(['/login']);
    alert('You have to login first to access this route');
    return false;
  }
};
