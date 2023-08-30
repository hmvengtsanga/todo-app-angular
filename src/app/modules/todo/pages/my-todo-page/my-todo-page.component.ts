import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil, tap, Subject, Observable} from 'rxjs';
import { Select, Actions, Store } from '@ngxs/store';

import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';
import { GetMyTodos } from 'src/app/modules/todo/actions/todo.action';
import { TodoListState } from 'src/app/modules/todo/states/todo-list.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { TodoList } from 'src/app/modules/todo/interfaces/todo';

@Component({
  selector: 'app-my-todo-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, TodoListComponent],
  templateUrl: './my-todo-page.component.html',
  styleUrls: ['./my-todo-page.component.scss']
})
export class MyTodoPageComponent implements OnInit, OnDestroy {

  private destroy:Subject<void> = new Subject<void>();

  @Select(TodoListState.todos) todos$!: Observable<TodoList[]>;
  @Select(TodoListState.totalItems) totalItems$!: Observable<number>;
  @Select(TodoListState.itemsPerPage) itemsPerPage$!: Observable<number>;
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  todos!: TodoList[];
  totalItems!: number;
  itemsPerPage!: number;
  isLoading!:boolean;

  constructor(
    private actions$: Actions,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.dispatchTodosList();
    this.subscribeActionHandlers();
    this.subscribeData();
  }

  subscribeData() {
    this.todos$.pipe(
      tap((todos) => this.todos = todos),
      takeUntil(this.destroy)
    ).subscribe();

    this.totalItems$.pipe(
      tap((total) => this.totalItems = total),
      takeUntil(this.destroy)
    ).subscribe();

    this.itemsPerPage$.pipe(
      tap((itemsPerPage) => this.itemsPerPage = itemsPerPage),
      takeUntil(this.destroy)
    ).subscribe();

    this.isLoading$.pipe(
      tap((isLoading) => this.isLoading = isLoading),
      takeUntil(this.destroy)
    ).subscribe();
  }

  dispatchTodosList() {
    this.store.dispatch(new GetMyTodos());
  }

  onPage(event:any) {
    this.store.dispatch(new GetMyTodos({
      ...event
    }));
  }

  subscribeActionHandlers() {
    // this.actions$
    //   .pipe(
    //     ofActionSuccessful(AddTodo),
    //     takeUntil(this.destroy)
    //   )
    //   .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
