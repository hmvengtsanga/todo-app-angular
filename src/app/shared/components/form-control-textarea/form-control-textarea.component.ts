import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';

@Component({
  selector: 'app-form-control-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormControlErrorComponent, TranslateModule, InputTextareaModule],
  templateUrl: './form-control-textarea.component.html',
  styleUrls: ['./form-control-textarea.component.scss']
})
export class FormControlTextareaComponent implements ControlValueAccessor {
  @Input() label!:string;
  @Input() hint!:string;
  @Input() rows:number = 5;
  @Input() cols:number = 30;
  @Input() autoResize:boolean = true;

  val: any;

  onChange: any = () => undefined;
  onTouch: any = () => undefined;

  constructor(@Optional() @Self() public inputControl: NgControl) {
    if (inputControl != null) {
      inputControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: any) {
    if (input) {
      this.val = input;
    }
  }
}
