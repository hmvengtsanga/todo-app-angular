import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/services/base-http.service';
import { TodoCreate, TodoUpdate } from 'src/app/modules/todo/interfaces/todo';

@Injectable()
export class TodoService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getMyTodos(query?:string): Observable<any> {
    query = query ? '?' + query : '';
    return this.http.get(`${this.baseUrl}/todos${query}`);
  }

  getPublicTodos(query?:string): Observable<any> {
    query = query ? '?' + query : '';
    return this.http.get(`${this.baseUrl}/todos/public${query}`);
  }

  createTodo(todo:TodoCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/todos`, todo);
  }

  updateTodo(todo:TodoUpdate): Observable<any> {
    return this.http.put(`${this.baseUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(todoId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${todoId}`);
  }

  changeStatusTodo(todoId:number, todoStatus: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/todos/${todoId}/status`, { status: todoStatus});
  }
}
