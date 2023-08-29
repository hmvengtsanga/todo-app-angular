import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTodoPageComponent } from './public-todo-page.component';

describe('PublicTodoPageComponent', () => {
  let component: PublicTodoPageComponent;
  let fixture: ComponentFixture<PublicTodoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicTodoPageComponent]
    });
    fixture = TestBed.createComponent(PublicTodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
