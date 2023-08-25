import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { AuthUser } from 'src/app/core/interfaces/auth-user';
import { LoginUser, LogoutUser } from 'src/app/core/actions/auth.action';
import { AuthService } from 'src/app/core/services/auth.service';

export interface AuthStateModel {
  auth: AuthUser|null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null
  }
})
@Injectable()
export class AuthState {

    constructor(private authService: AuthService) {}

    @Selector()
    static token({auth}: AuthStateModel): string|undefined {
        return auth?.token;
    }

    @Selector()
    static isAuthenticated({auth}: AuthStateModel): boolean {
      return !!auth?.token;
    }

    @Action(LoginUser)
    loginUser(ctx: StateContext<AuthStateModel>, action: LoginUser) {
        return this.authService.login(action.payload).pipe(
          tap(data => {
            const state = ctx.getState();
            ctx.patchState({
              auth: {
                  ...state.auth,
                  ...data
              }
            });
          })
        );
    }

    @Action(LogoutUser)
    logoutUser(ctx: StateContext<AuthStateModel>) {
      ctx.setState({
        auth: null
      });
    }
}