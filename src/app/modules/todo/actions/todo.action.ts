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

export class UpdateTodo {
    static readonly type = '[TODO Api] Update Todo';

    constructor(public payload: TodoUpdate) {}
}

export class DeleteTodo {
    static readonly type = '[TODO Api] Delete Todo';

    constructor(public todoId: number) {}
}

export class DoneTodo {
    static readonly type = '[TODO Api] Set Done todo';

    constructor(public todoId: number) {}
}

export class OpenTodo {
    static readonly type = '[TODO Api] Set In going todo';

    constructor(public todoId: number) {}
}