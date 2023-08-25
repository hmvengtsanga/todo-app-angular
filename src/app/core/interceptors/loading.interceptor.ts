import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { Store} from '@ngxs/store';
import { StartLoading, StopLoading } from 'src/app/core/actions/loading.action';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  activeRequests = 0;

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.activeRequests === 0) {
      this.store.dispatch(new StartLoading());
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if(this.activeRequests === 0) {
          this.store.dispatch(new StopLoading());
        }
      })
    );

  }
}
