import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { AuthState } from 'src/app/core/states/auth.state';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  
  const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);

  if (isAuthenticated === true) {
    router.navigate(['/todos']);
    return false;
  }

  return true;
};
