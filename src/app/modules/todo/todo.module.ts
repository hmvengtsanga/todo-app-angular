import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LandingPageComponent,
  ]
})
export class TodoModule { }
