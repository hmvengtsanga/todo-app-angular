import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState } from 'src/app/core/states/auth.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const method = request.method;
    const url = request.url;

    if(this.noNeedJwt(method, url) === false) {
      const token = this.store.selectSnapshot(AuthState.token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }

  noNeedJwt(method: string, url:string): boolean {
    const isRegister = method === "POST" && url.includes('/api/users');
    const isLogin = method === "POST" && url.includes('/api/authentication');
    const isRefreshToken = method === "POST" && url.includes('/api/refresh-token');

    return isRegister || isLogin || isRefreshToken;
  }
}
