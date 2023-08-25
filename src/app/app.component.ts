import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from 'src/app/core/states/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(AuthState.isAuthenticated) userIsAuthenticated$!: Observable<boolean>;

  constructor () {} 
}
