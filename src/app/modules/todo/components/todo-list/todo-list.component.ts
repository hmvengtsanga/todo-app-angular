import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

import { Todo } from 'src/app/modules/todo/interfaces/todo';
import { SeverityPipe } from 'src/app/modules/todo/pipes/severity.pipe';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, PaginatorModule, TagModule, TooltipModule, SeverityPipe, ButtonModule, ChipModule, TruncatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input({required: true}) todos!: Todo[];
  @Input({required: true}) total!: number;
  @Input({required: true}) rows!: number;
  @Input() loading!: boolean;
  @Input() public: boolean = false;

  @Output() page:EventEmitter<PaginatorState> = new EventEmitter<PaginatorState>();
  @Output() update:EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() delete:EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() changeStatus:EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() show:EventEmitter<Todo> = new EventEmitter<Todo>();

  onPageChange(event:PaginatorState) {
    this.page.emit(event);
  }

  updateTodo(event:Todo) {
    this.update.emit(event);
  }

  changeStatusTodo(event:Todo) {
    this.changeStatus.emit(event);
  }

  deleteTodo(event:Todo) {
    this.delete.emit(event);
  }

  showTodo(event:Todo) {
    this.show.emit(event);
  }
}
