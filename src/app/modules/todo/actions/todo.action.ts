import { Pagination } from 'src/app/core/interfaces/pagination';

export class GetMyTodos {
    static readonly type = '[TODO Api] Get my todos';

    constructor(public pagination?: Pagination) {}
}

export class GetPublicTodos {
    static readonly type = '[TODO Api] Get public todos';

    constructor(public pagination?: Pagination) {}
}