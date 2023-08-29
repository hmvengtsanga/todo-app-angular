import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { TodoList } from 'src/app/modules/todo/interfaces/todo';
import { GetMyTodos, GetPublicTodos } from 'src/app/modules/todo/actions/todo.action';
import { TodoService } from 'src/app/modules/todo/services/todo.service';
import { Pagination } from 'src/app/core/interfaces/pagination';

export interface TodoListStateModel {
  todos: TodoList[];
  totalItems: number;
  itemsPerPage: number;
}

@State<TodoListStateModel>({
  name: 'todoList',
  defaults: {
    todos: [],
    totalItems: 0,
    itemsPerPage: 5
  }
})
@Injectable()
export class TodoListState {

    @Selector()
    static todos({todos}: TodoListStateModel): TodoList[] {
        return todos;
    }

    @Selector()
    static totalItems({totalItems}: TodoListStateModel): number {
        return totalItems;
    }

    @Selector()
    static itemsPerPage({itemsPerPage}: TodoListStateModel): number {
        return itemsPerPage;
    }

    constructor(private totoService: TodoService) {}

    @Action(GetMyTodos)
    getMyTodos(ctx: StateContext<TodoListStateModel>, { pagination }: GetMyTodos) {
        const state = ctx.getState();

        const query = this.getPagination({
          page: 0,
          rows: state.itemsPerPage,
          ...pagination
        });

        return this.totoService.getMyTodos(query).pipe(
          tap(results => {
            const data = results["hydra:member"];
            const total = results["hydra:totalItems"];
            ctx.patchState({
              todos: [
                  ...data
              ],
              totalItems: total
            });
          })
        );
    }

    @Action(GetPublicTodos)
    getPublicTodos(ctx: StateContext<TodoListStateModel>, { pagination }: GetPublicTodos) {
        const state = ctx.getState();

        const query = this.getPagination({
          page: 0,
          rows: state.itemsPerPage,
          ...pagination
        });

        return this.totoService.getPublicTodos(query).pipe(
          tap(results => {
            const data = results["hydra:member"];
            const total = results["hydra:totalItems"];
            ctx.patchState({
              todos: [
                  ...data
              ],
              totalItems: total
            });
          })
        );
    }

    getPagination(pagination: Pagination): string {
      const { page, rows } = pagination;
      return `page=${ (page ?? 0) + 1}&itemsPerPage=${rows}`;
    }
}