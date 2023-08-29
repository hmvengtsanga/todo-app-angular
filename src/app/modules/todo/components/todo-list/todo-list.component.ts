import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

import { TodoList } from 'src/app/modules/todo/interfaces/todo';
import { SeverityPipe } from 'src/app/modules/todo/pipes/severity.pipe';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, PaginatorModule, TagModule, SeverityPipe, ButtonModule, ChipModule, TruncatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input({required: true}) todos!: TodoList[];
  @Input({required: true}) total!: number;
  @Input({required: true}) rows!: number;
  @Input() loading!: boolean;
  @Input() public: boolean = false;

  @Output() page:EventEmitter<PaginatorState> = new EventEmitter<PaginatorState>()

  onPageChange(event:PaginatorState) {
    this.page.emit(event);
  }
}
