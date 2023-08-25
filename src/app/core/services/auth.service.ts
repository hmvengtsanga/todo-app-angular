import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/services/base-http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  constructor(private http: HttpClient) { 
    super();
  }

  login(data:  { email:string; password: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication`, data);
  }
}
