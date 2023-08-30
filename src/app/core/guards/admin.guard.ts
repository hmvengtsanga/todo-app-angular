import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import {inject} from '@angular/core';

import { AuthState } from 'src/app/core/states/auth.state';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  
  const isAdmin = store.selectSnapshot(AuthState.isAdmin);

  return isAdmin;
};
