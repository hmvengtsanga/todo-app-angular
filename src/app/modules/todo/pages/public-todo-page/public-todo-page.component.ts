import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil, tap, Subject, Observable} from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';

import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';
import { GetPublicTodos } from 'src/app/modules/todo/actions/todo.action';
import { TodoListState } from 'src/app/modules/todo/states/todo-list.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { Todo, TodoItem } from 'src/app/modules/todo/interfaces/todo';
import { DialogConfig } from '@app/modules/todo/models/dialog-config.model';
import { TodoFormDialogComponent } from 'src/app/modules/todo/components/todo-form-dialog/todo-form-dialog.component';

@Component({
  selector: 'app-public-todo-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, TodoListComponent, TodoFormDialogComponent],
  templateUrl: './public-todo-page.component.html',
  styleUrls: ['./public-todo-page.component.scss']
})
export class PublicTodoPageComponent implements OnInit, OnDestroy {
  private destroy:Subject<void> = new Subject<void>();

  dialog: DialogConfig = new DialogConfig();

  @Select(TodoListState.todos) todos$!: Observable<Todo[]>;
  @Select(TodoListState.totalItems) totalItems$!: Observable<number>;
  @Select(TodoListState.itemsPerPage) itemsPerPage$!: Observable<number>;
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  todos!: Todo[];
  totalItems!: number;
  itemsPerPage!: number;
  isLoading!:boolean;

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.dispatchTodosList();
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
    this.store.dispatch(new GetPublicTodos());
  }

  onPage(event:any) {
    this.store.dispatch(new GetPublicTodos({
      ...event
    }));
  }

  openShowTodoDialog(data: Todo) {
    this.dialog = new DialogConfig({ 
      header: this.translateService.instant('todo.dialog.header.show_todo') + ` #${data.id}`,
      visible: true,
      todo: data
    });
  }

  onCloseDialog() {
    this.dialog = new DialogConfig();
}

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
