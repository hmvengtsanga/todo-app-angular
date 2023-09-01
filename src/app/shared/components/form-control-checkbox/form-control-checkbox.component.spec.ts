import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlCheckboxComponent } from './form-control-checkbox.component';

describe('FormControlCheckboxComponent', () => {
  let component: FormControlCheckboxComponent;
  let fixture: ComponentFixture<FormControlCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormControlCheckboxComponent]
    });
    fixture = TestBed.createComponent(FormControlCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
