import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-control-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent {
  @Input() control!: AbstractControl;

  get errors(): string[] {
    if (this.control === undefined) {
       return [];
    }
    
    const errors = this.control.errors;
    return Object.entries(errors as {})
          .map((error: any[]) => error[0])
          .map((val: string) => {
              switch(val) {
                 case 'required':
                   return 'shared.form.error.required';
                 case 'email':
                    return 'shared.form.error.email';
                 default:
                   return 'shared.form.error.default';
              }
          });
  }
}
