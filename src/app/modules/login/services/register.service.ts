import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/services/base-http.service';
import { UserDto } from 'src/app/modules/login/models/user.model'

@Injectable()
export class RegisterService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  register(data: UserDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }
}
