import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl, ControlValueAccessor } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';

import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';

@Component({
  selector: 'app-form-control-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, PasswordModule, FormsModule, ReactiveFormsModule, FormControlErrorComponent],
  templateUrl: './form-control-password.component.html',
  styleUrls: ['./form-control-password.component.scss'],
})
export class FormControlPasswordComponent implements ControlValueAccessor {
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
