import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { LoginRoutingModule } from './login-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterState } from 'src/app/modules/login/states/register.state';
import { RegisterService } from 'src/app/modules/login/services/register.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LandingPageComponent,
    NgxsModule.forFeature([RegisterState]),
  ],
  providers: [
    RegisterService
  ]
})
export class LoginModule { }
