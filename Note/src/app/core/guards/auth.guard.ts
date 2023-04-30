import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const guard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  if (_AuthService.userData.getValue() && localStorage.getItem('token')) {
    return true;
  } else {
    _Router.navigate(['/login']);
    location.pathname = 'login';
    return false;
  }
};
