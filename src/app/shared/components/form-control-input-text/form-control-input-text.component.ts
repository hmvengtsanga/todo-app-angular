import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NgControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';

import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';

@Component({
  selector: 'app-form-control-input-text',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, InputTextModule, FormControlErrorComponent],
  templateUrl: './form-control-input-text.component.html',
  styleUrls: ['./form-control-input-text.component.scss'],
})
export class FormControlInputTextComponent implements ControlValueAccessor {
  @Input() label!:string;
  @Input() hint!:string;

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
