import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, take, throwError } from 'rxjs';
import { Store } from '@ngxs/store';

import { RefreshUserToken } from 'src/app/core/actions/auth.action';
import { AuthState } from 'src/app/core/states/auth.state';

@Injectable()
export class RefreshJwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401JwtError(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401JwtError(request: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = this.store.selectSnapshot(AuthState.refreshToken);
    return this.store.dispatch(new RefreshUserToken(refreshToken as string)).pipe(
      take(1),
      tap(() => {
        const token = this.store.selectSnapshot(AuthState.token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next.handle(request);
      })
    );
  }
}
