import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserListState } from 'src/app/modules/user/states/user-list.state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxsModule.forFeature([UserListState]),
    LandingPageComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
