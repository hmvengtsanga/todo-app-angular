import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTodoPageComponent } from './my-todo-page.component';

describe('MyTodoPageComponent', () => {
  let component: MyTodoPageComponent;
  let fixture: ComponentFixture<MyTodoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyTodoPageComponent]
    });
    fixture = TestBed.createComponent(MyTodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
