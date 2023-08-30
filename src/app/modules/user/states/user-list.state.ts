import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { UserList } from 'src/app/modules/user/interfaces/user';
import { GetUsers } from 'src/app/modules/user/actions/user.action';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Pagination } from 'src/app/core/interfaces/pagination';

export interface UserListStateModel {
  users: UserList[];
  totalItems: number;
  itemsPerPage: number;
}

@State<UserListStateModel>({
  name: 'userList',
  defaults: {
    users: [],
    totalItems: 0,
    itemsPerPage: 10
  }
})
@Injectable()
export class UserListState {

    @Selector()
    static users({users}: UserListStateModel): UserList[] {
        return users;
    }

    @Selector()
    static totalItems({totalItems}: UserListStateModel): number {
        return totalItems;
    }

    @Selector()
    static itemsPerPage({itemsPerPage}: UserListStateModel): number {
        return itemsPerPage;
    }

    constructor(private userService: UserService) {}

    @Action(GetUsers)
    getUsers(ctx: StateContext<UserListStateModel>, { pagination }: GetUsers) {
        const state = ctx.getState();
        const pageData = {
          page: 0,
          rows: state.itemsPerPage,
          ...pagination
        } as Pagination;
        const query = this.getPagination(pageData);

        return this.userService.getUsers(query).pipe(
          tap(results => {
            const data = results["hydra:member"];
            const total = results["hydra:totalItems"];
            ctx.patchState({
              users: [
                  ...data
              ],
              totalItems: total,
              itemsPerPage: pageData.rows
            });
          })
        );
    }

    getPagination(pagination: Pagination): string {
      const { page, rows } = pagination;
      return `page=${ (page ?? 0) + 1}&itemsPerPage=${rows}`;
    }
}