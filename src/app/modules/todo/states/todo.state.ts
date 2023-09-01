import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { TodoList } from 'src/app/modules/todo/interfaces/todo';
import { AddTodo } from 'src/app/modules/todo/actions/todo.action';
import { TodoService } from 'src/app/modules/todo/services/todo.service';

export interface TodoStateModel {
  todo: TodoList|null;
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todo: null
  }
})
@Injectable()
export class TodoState {

    @Selector()
    static todo({todo}: TodoStateModel): TodoList|null {
        return todo;
    }

    constructor(private totoService: TodoService) {}

    @Action(AddTodo)
    getMyTodos(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
      return this.totoService.createTodo(payload);
    }
}