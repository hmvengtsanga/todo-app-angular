import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil, tap, Subject, Observable} from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { UserListComponent } from 'src/app/modules/user/components/user-list/user-list.component';
import { GetUsers } from 'src/app/modules/user/actions/user.action';
import { UserListState } from 'src/app/modules/user/states/user-list.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { UserList } from 'src/app/modules/user/interfaces/user';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, UserListComponent],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  private destroy:Subject<void> = new Subject<void>();

  @Select(UserListState.users) users$!: Observable<UserList[]>;
  @Select(UserListState.totalItems) totalItems$!: Observable<number>;
  @Select(UserListState.itemsPerPage) itemsPerPage$!: Observable<number>;
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  users!: UserList[];
  totalItems!: number;
  itemsPerPage!: number;
  isLoading!:boolean;

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.dispatchUsersList();
    this.subscribeData();
  }

  subscribeData() {
    this.users$.pipe(
      tap((users) => this.users = users),
      takeUntil(this.destroy)
    ).subscribe();

    this.totalItems$.pipe(
      tap((total) => this.totalItems = total),
      takeUntil(this.destroy)
    ).subscribe();

    this.itemsPerPage$.pipe(
      tap((itemsPerPage) => this.itemsPerPage = itemsPerPage),
      takeUntil(this.destroy)
    ).subscribe();

    this.isLoading$.pipe(
      tap((isLoading) => this.isLoading = isLoading),
      takeUntil(this.destroy)
    ).subscribe();
  }

  dispatchUsersList() {
    this.store.dispatch(new GetUsers());
  }

  onPage(event:any) {
    this.store.dispatch(new GetUsers({
      ...event
    }));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
