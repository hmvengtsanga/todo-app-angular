import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil, tap, Subject, Observable, catchError, of} from 'rxjs';
import { Select, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';
import { GetMyTodos, AddTodo, UpdateTodo, DeleteTodo, DoneTodo, OpenTodo } from 'src/app/modules/todo/actions/todo.action';
import { TodoListState } from 'src/app/modules/todo/states/todo-list.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { TodoFormDialogComponent } from 'src/app/modules/todo/components/todo-form-dialog/todo-form-dialog.component';
import { TodoCreate, Todo, TodoUpdate, TodoItem } from 'src/app/modules/todo/interfaces/todo';
import { DialogConfig } from '@app/modules/todo/models/dialog-config.model';
import { ToastService } from 'src/app/core/services/toast.service'

@Component({
  selector: 'app-my-todo-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, ConfirmDialogModule, TodoListComponent, ButtonModule, TodoFormDialogComponent],
  providers: [DialogService, ConfirmationService],
  templateUrl: './my-todo-page.component.html',
  styleUrls: ['./my-todo-page.component.scss'],
})
export class MyTodoPageComponent implements OnInit, OnDestroy {

  private destroy:Subject<void> = new Subject<void>();

  @Select(TodoListState.todos) todos$!: Observable<Todo[]>;
  @Select(TodoListState.totalItems) totalItems$!: Observable<number>;
  @Select(TodoListState.itemsPerPage) itemsPerPage$!: Observable<number>;
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  todos!: Todo[];
  totalItems!: number;
  itemsPerPage!: number;
  isLoading!:boolean;

  dialog: DialogConfig = new DialogConfig();

  constructor(
    private actions$: Actions,
    private store: Store,
    public dialogService: DialogService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.dispatchTodosList();
    this.subscribeActionHandlers();
    this.subscribeData();
  }

  private subscribeData() {
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

  private dispatchTodosList() {
    this.store.dispatch(new GetMyTodos());
  }

  onPage(event:any) {
    this.store.dispatch(new GetMyTodos({
      ...event
    }));
  }

  showAddTodoDialog() {
    this.dialog = new DialogConfig({ 
      header: this.translateService.instant('todo.dialog.header.add_todo'),
      visible: true,
      action: 'create'
    });
  }

  openUpdateTodoDialog(data: TodoUpdate) {
    this.dialog = new DialogConfig({ 
      header: this.translateService.instant('todo.dialog.header.update_todo') + ` #${data.id}`,
      visible: true,
      todo: data,
      action: 'update'
    });
  }

  private subscribeActionHandlers() {
    this.actions$
      .pipe(
        ofActionSuccessful(AddTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success.add'));
        this.onSkipDialog();
        this.dispatchTodosList();
      });

    this.actions$
      .pipe(
        ofActionSuccessful(UpdateTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success.update'));
        this.onSkipDialog();
        this.dispatchTodosList();
      });

    this.actions$
      .pipe(
        ofActionSuccessful(DeleteTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success.delete'));
        this.dispatchTodosList();
      });
    
    this.actions$
      .pipe(
        ofActionSuccessful(DoneTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success.status_done'));
        this.dispatchTodosList();
      });

    this.actions$
      .pipe(
        ofActionSuccessful(OpenTodo),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.toastService.success(this.translateService.instant('todo.form.success.status_in_going'));
        this.dispatchTodosList();
      });
  }

  onChangeStatusTodo(todo: Todo) {
    this.store.dispatch(todo.status === 'done' ? new OpenTodo(todo.id) : new DoneTodo(todo.id)).pipe(
        catchError(err => {
            this._showError(err);
            return of('');
        })
    ).subscribe();
  }

  onDeleteTodo(todo: Todo) {
    this.confirmationService.confirm({
        message: this.translateService.instant('todo.confirm_dialog.delete.message'),
        header: this.translateService.instant('todo.confirm_dialog.delete.header', {id: todo.id}),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: this.translateService.instant('todo.confirm_dialog.btn.accept'),
        rejectLabel: this.translateService.instant('todo.confirm_dialog.btn.reject'),
        accept: () => {
            this._onDeleteTodo(todo);
        }
    });
  }

  onCloseDialog(data: TodoItem) {
      switch(data.action) {
        case 'create':
          this._onAddTodo(data.todo as TodoCreate);
          break;
        case 'update':
          this._onUpdateTodo(data.todo as TodoUpdate);
          break;
        case 'hide':
          this.onSkipDialog();
          break;
        default:
          throw Error('Unknow dialog action.');
      }
  }

  onSkipDialog() {
    this.dialog = new DialogConfig();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private _onDeleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo.id)).pipe(
        catchError(err => {
            this._showError(err);
            return of('');
        })
    ).subscribe();
  }

  private _onAddTodo(todo: TodoCreate) {
    this.store.dispatch(new AddTodo(todo)).pipe(
        catchError(err => {
            this._showError(err);
            return of('');
        })
    ).subscribe();
  }

  private _onUpdateTodo(todo: TodoUpdate) {
    this.store.dispatch(new UpdateTodo(todo)).pipe(
        catchError(err => {
            this._showError(err);
            return of('');
        })
    ).subscribe();
  }

  private _showError(err: any) {
    const errorsApi = err.error ?? err.message;
    let errors = [];
    if(errorsApi.hasOwnProperty('hydra:description')) {
      errors = errorsApi['hydra:description'].split('\n');
    } else {
      errors.push(errorsApi);
    }
    
    errors.forEach((error: any|string) => this.toastService.error(error, {life: 5000}));
  }

}
