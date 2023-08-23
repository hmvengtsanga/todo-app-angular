import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlPasswordComponent } from './form-control-password.component';

describe('FormControlPasswordComponent', () => {
  let component: FormControlPasswordComponent;
  let fixture: ComponentFixture<FormControlPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormControlPasswordComponent]
    });
    fixture = TestBed.createComponent(FormControlPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
