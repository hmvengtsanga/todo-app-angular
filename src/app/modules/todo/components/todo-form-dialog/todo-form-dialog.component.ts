import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

import { FormControlInputTextComponent } from '@app/shared/components/form-control-input-text/form-control-input-text.component';
import { FormControlTextareaComponent } from '@app/shared/components/form-control-textarea/form-control-textarea.component';
import { FormControlCheckboxComponent } from '@app/shared/components/form-control-checkbox/form-control-checkbox.component';
import { TodoCreate, TodoUpdate, Todo, TodoItem } from '@app/modules/todo/interfaces/todo';
import { DialogActionType } from "src/app/modules/todo/interfaces/custum-type";

@Component({
  selector: 'app-todo-form-dialog',
  standalone: true,
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule,
    ChipModule, TagModule, FormControlInputTextComponent, 
    FormControlTextareaComponent, FormControlCheckboxComponent, DialogModule
  ],
  templateUrl: './todo-form-dialog.component.html',
  styleUrls: ['./todo-form-dialog.component.scss']
})
export class TodoFormDialogComponent implements OnChanges  {

  @Input({required: true}) canShow: boolean = false;
  @Input({required: true}) header: string|undefined;
  @Input() disabled: boolean= false;
  @Input() todo!: Todo|undefined;
  @Input({required: true}) action!: DialogActionType;

  @Output() addTodo:EventEmitter<TodoCreate> = new EventEmitter<TodoCreate>();
  @Output() updateTodo:EventEmitter<TodoUpdate> = new EventEmitter<TodoUpdate>();

  @Output() closeDialog:EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.builForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('todo')) {
      const todo = changes["todo"]?.currentValue;
      if (todo) {
        this.hydrateTodoFormDialog(todo);
      }
    }
  }

  builForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      public: [ false, []],
    });
  }

  hydrateTodoFormDialog(todo:Todo) {
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

    this.closeDialog.emit({
        action: 'create',
        todo: this.todoForm.value
    });
  }

  updateTodoSubmit(): void {
      if (!this.todoForm.valid) {
          this.markAsTouchedForm();

          return;
      }

      this.closeDialog.emit({
        action: 'update',
        todo: {id:this.todo?.id, ...this.todoForm.value}
    });
  }

  markAsTouchedForm() {
    Object.keys(this.todoForm.controls).forEach(field => {
      const control = this.todoForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  hideDialog() {
     this.closeDialog.emit({
       action: 'hide'
     });
  }

  close(e:any) {
    e.preventDefault();
    this.hideDialog();
  }
}
