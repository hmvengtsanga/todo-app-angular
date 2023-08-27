import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, Subject, Observable, catchError, of } from 'rxjs';

import { FormControlInputTextComponent } from 'src/app/shared/components/form-control-input-text/form-control-input-text.component'
import { CreateUser } from 'src/app/modules/login/actions/user.action';
import { LoadingState } from 'src/app/core/states/loading.state';
import { ToastService } from 'src/app/core/services/toast.service'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FormControlInputTextComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  private destroy:Subject<void> = new Subject<void>();

  @Select(LoadingState.isLoading) formIsSubmitted$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private actions$: Actions,
    private store: Store,
    private toastService: ToastService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.subscribeActionHandlers();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  subscribeActionHandlers() {
    this.actions$
      .pipe(
        ofActionSuccessful(CreateUser),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.registerForm.reset({});
        this.toastService.success(
            this.translateService.instant('login.sign_up.form.success'),
            {life: 10000}
        );
        this.router.navigate(['/login']);
      });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      return;
   }

   const registerData = this.registerForm.value;
   
   this.store.dispatch(new CreateUser(registerData)).pipe(
        catchError(err => {
            const errorsApi = err.error ?? err.message;
            let errors = [];
            if(errorsApi.hasOwnProperty('hydra:description')) {
              errors = errorsApi['hydra:description'].split('\n');
            } else {
              errors.push(errorsApi);
            }
            
            this.registerForm.patchValue(registerData);
            errors.forEach((error: any|string) => this.toastService.error(error, {life: 5000}));

            return of('');
        })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
  
}
