import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil, tap, Subject, Observable, catchError, of} from 'rxjs';
import { Select, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';
import { GetMyTodos, AddTodo } from 'src/app/modules/todo/actions/todo.action';
import { TodoListState } from 'src/app/modules/todo/states/todo-list.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { TodoList } from 'src/app/modules/todo/interfaces/todo';
import { TodoFormDialogComponent } from 'src/app/modules/todo/components/todo-form-dialog/todo-form-dialog.component';
import { TodoCreate, TodoUpdate } from 'src/app/modules/todo/interfaces/todo';
import { DialogConfig } from '@app/modules/todo/models/dialog-config.model';
import { ToastService } from 'src/app/core/services/toast.service'

@Component({
  selector: 'app-my-todo-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, TodoListComponent, ButtonModule, TodoFormDialogComponent],
  providers: [DialogService],
  templateUrl: './my-todo-page.component.html',
  styleUrls: ['./my-todo-page.component.scss'],
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

  dialog: DialogConfig<null> = new DialogConfig<null>();

  constructor(
    private actions$: Actions,
    private store: Store,
    public dialogService: DialogService,
    private translateService: TranslateService,
    private toastService: ToastService
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

  showAddTodoDialog() {
    this.dialog = new DialogConfig<null>({ 
      header: this.translateService.instant('todo.dialog.header.add_todo'),
      visible: true
    });
  }

  subscribeActionHandlers() {
    this.actions$
      .pipe(
        ofActionSuccessful(AddTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success'));
        this.onCloseDialog();
        this.dispatchTodosList();
      });
  }

  onAddTodo(todo: TodoCreate) {
    this.store.dispatch(new AddTodo(todo)).pipe(
        catchError(err => {
            this.showError(err);
            return of('');
        })
    ).subscribe();
  }

  onUpdateTodo(toto: TodoUpdate) {
    
  }

  showError(err: any) {
    const errorsApi = err.error ?? err.message;
    let errors = [];
    if(errorsApi.hasOwnProperty('hydra:description')) {
      errors = errorsApi['hydra:description'].split('\n');
    } else {
      errors.push(errorsApi);
    }
    
    errors.forEach((error: any|string) => this.toastService.error(error, {life: 5000}));
  }

  onCloseDialog() {
    this.dialog = new DialogConfig();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
