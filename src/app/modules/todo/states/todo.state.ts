import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { Todo } from 'src/app/modules/todo/interfaces/todo';
import { AddTodo, UpdateTodo, DeleteTodo, DoneTodo, OpenTodo } from 'src/app/modules/todo/actions/todo.action';
import { TodoService } from 'src/app/modules/todo/services/todo.service';

export interface TodoStateModel {
  todo: Todo|null;
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
    static todo({todo}: TodoStateModel): Todo|null {
        return todo;
    }

    constructor(private totoService: TodoService) {}

    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
      return this.totoService.createTodo(payload);
    }

    @Action(UpdateTodo)
    updateTodo(ctx: StateContext<TodoStateModel>, { payload }: UpdateTodo) {
      return this.totoService.updateTodo(payload);
    }

    @Action(DeleteTodo)
    deleteTodo(ctx: StateContext<TodoStateModel>, { todoId }: DeleteTodo) {
      return this.totoService.deleteTodo(todoId);
    }

    @Action(DoneTodo)
    doneTodo(ctx: StateContext<TodoStateModel>, { todoId }: DoneTodo) {
      return this.totoService.changeStatusTodo(todoId, 'done');
    }

    @Action(OpenTodo)
    openTodo(ctx: StateContext<TodoStateModel>, { todoId }: OpenTodo) {
      return this.totoService.changeStatusTodo(todoId, 'in_progress');
    }
}