import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn, ActivatedRoute, mapToCanActivate
} from '@angular/router';
import {catchError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  if (!loginService.isLoggedIn()) {

    router.navigate(['/login']); // go to login if not authenticated

    return false;

  }

return true;
}