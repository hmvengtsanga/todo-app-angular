import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/services/base-http.service';

@Injectable()
export class UserService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(query?:string): Observable<any> {
    query = query ? '?' + query : '';
    return this.http.get(`${this.baseUrl}/users${query}`);
  }
}
