import { Pagination } from 'src/app/core/interfaces/pagination';

export class GetUsers {
    static readonly type = '[User Api] Get users';

    constructor(public pagination?: Pagination) {}
}