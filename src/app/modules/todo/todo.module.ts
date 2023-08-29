import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { TodoRoutingModule } from './todo-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TodoListState } from './states/todo-list.state';
import { TodoService } from 'src/app/modules/todo/services/todo.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LandingPageComponent,
    NgxsModule.forFeature([TodoListState])
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
