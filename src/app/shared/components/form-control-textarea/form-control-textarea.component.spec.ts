import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlTextareaComponent } from './form-control-textarea.component';

describe('FormControlTextareaComponent', () => {
  let component: FormControlTextareaComponent;
  let fixture: ComponentFixture<FormControlTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormControlTextareaComponent]
    });
    fixture = TestBed.createComponent(FormControlTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
