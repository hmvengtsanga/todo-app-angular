import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { FormControlInputTextComponent } from '@app/shared/components/form-control-input-text/form-control-input-text.component';
import { FormControlTextareaComponent } from '@app/shared/components/form-control-textarea/form-control-textarea.component';
import { FormControlCheckboxComponent } from '@app/shared/components/form-control-checkbox/form-control-checkbox.component';
import { TodoCreate, TodoUpdate } from '@app/modules/todo/interfaces/todo';

@Component({
  selector: 'app-todo-form-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, FormControlInputTextComponent, FormControlTextareaComponent, FormControlCheckboxComponent, DialogModule],
  templateUrl: './todo-form-dialog.component.html',
  styleUrls: ['./todo-form-dialog.component.scss']
})
export class TodoFormDialogComponent implements OnInit, OnChanges  {

  @Input({required: true}) canShow: boolean = false;
  @Input({required: true}) header: string|undefined;
  @Input() todo!: TodoCreate|TodoUpdate|null;
  @Input({required: true}) action!: 'create' | 'update';

  @Output() closeDialog:EventEmitter<void> = new EventEmitter<void>();
  @Output() addTodo:EventEmitter<TodoCreate> = new EventEmitter<TodoCreate>();
  @Output() updateTodo:EventEmitter<TodoUpdate> = new EventEmitter<TodoUpdate>();

  todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.builForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('todo')) {
      const todo = changes["todo"]?.currentValue;
      this.hydrateTodoFormDialog(todo);
    }
  }

  builForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      public: [ false, []],
    });
  }

  hydrateTodoFormDialog(todo:TodoUpdate) {
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      public: todo.public,
    });

    this.todoForm.updateValueAndValidity();
  }

  addTodoSubmit(): void {
    if (!this.todoForm.valid) {
      this.markAsTouchedForm();

      return;
    }

    this.addTodo.emit({...this.todoForm.value});
  }

  updateTodoSubmit(): void {
    if (!this.todoForm.valid) {
        this.markAsTouchedForm();

        return;
    }

    this.updateTodo.emit({...this.todo, ...this.todoForm.value});
  }

  markAsTouchedForm() {
    Object.keys(this.todoForm.controls).forEach(field => {
      const control = this.todoForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  hideDialog() {
     this.closeDialog.emit();
  }
}
