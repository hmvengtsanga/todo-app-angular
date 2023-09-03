import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {CheckboxModule} from 'primeng/checkbox';

import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';

@Component({
  selector: 'app-form-control-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FormControlErrorComponent, CheckboxModule],
  templateUrl: './form-control-checkbox.component.html',
  styleUrls: ['./form-control-checkbox.component.scss']
})
export class FormControlCheckboxComponent implements ControlValueAccessor {
  @Input() label!:string;
  @Input() hint!:string;
  @Input() disabled:boolean = false;

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
