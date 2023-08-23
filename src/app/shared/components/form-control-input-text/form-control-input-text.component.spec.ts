import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlInputTextComponent } from './form-control-input-text.component';

describe('FormControlInputTextComponent', () => {
  let component: FormControlInputTextComponent;
  let fixture: ComponentFixture<FormControlInputTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormControlInputTextComponent]
    });
    fixture = TestBed.createComponent(FormControlInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
