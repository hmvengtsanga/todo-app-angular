import { Pagination } from 'src/app/core/interfaces/pagination';

import { TodoCreate, TodoUpdate } from 'src/app/modules/todo/interfaces/todo';

export class GetMyTodos {
    static readonly type = '[TODO Api] Get my todos';

    constructor(public pagination?: Pagination) {}
}

export class GetPublicTodos {
    static readonly type = '[TODO Api] Get public todos';

    constructor(public pagination?: Pagination) {}
}

export class AddTodo {
    static readonly type = '[TODO Api] Add Todo';

    constructor(public payload: TodoCreate) {}
}