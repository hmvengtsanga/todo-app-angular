import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { takeUntil, Subject, Observable, catchError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { FormControlInputTextComponent } from 'src/app/shared/components/form-control-input-text/form-control-input-text.component'
import { FormControlPasswordComponent } from 'src/app/shared/components/form-control-password/form-control-password.component'
import { LoginUser } from 'src/app/core/actions/auth.action';
import { LoadingState } from 'src/app/core/states/loading.state';
import { ToastService } from 'src/app/core/services/toast.service'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FormControlInputTextComponent,
    FormControlPasswordComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  subscribeActionHandlers() {
    this.actions$
      .pipe(
        ofActionSuccessful(LoginUser),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.loginForm.reset({})
        this.router.navigate(['/todos']);
      });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
       return 
    }

    const loginData = this.loginForm.value;

    this.store.dispatch(new LoginUser(loginData)).pipe(
        catchError(err => {
          this.loginForm.patchValue(loginData);
          this.toastService.error(
            err.error.message ?? err.message,
            this.translateService.instant('login.sign_in.form.errors')
          );
          return of('');
        })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
