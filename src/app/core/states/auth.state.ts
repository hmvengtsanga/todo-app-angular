import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { AuthUser } from 'src/app/core/interfaces/auth-user';
import { LoginUser, LogoutUser, RefreshUserToken} from 'src/app/core/actions/auth.action';
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

    @Selector()
    static isAdmin({auth}: AuthStateModel): boolean {
      const roles = auth?.roles ?? [];

      return roles.includes('ROLE_ADMIN');
    }

    @Selector()
    static firstnameLastname({auth}: AuthStateModel): string {
      const firstname = auth?.firstname?.toLowerCase() ?? '';
      const lastname = auth?.lastname?.toLowerCase() ?? '';

      return `${firstname?.charAt(0).toUpperCase() + firstname?.slice(1)} ${lastname?.charAt(0).toUpperCase() + lastname?.slice(1)}`;
    }

    @Selector()
    static refreshToken({auth}: AuthStateModel): string|undefined {
        return auth?.refreshToken;
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

    @Action(RefreshUserToken)
    refreshUserToken(ctx: StateContext<AuthStateModel>, action: RefreshUserToken) {
        return this.authService.refreshToken(action).pipe(
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