import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/services/base-http.service';

@Injectable()
export class TodoService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getMyTodos(query?:string): Observable<any> {
    query = query ? '?' + query : '';
    return this.http.get(`${this.baseUrl}/todos${query}`);
  }

  getPublicTodos(query?:string): Observable<any> {
    query = query ? '?' + query : '';
    return this.http.get(`${this.baseUrl}/todos/public${query}`);
  }
}
