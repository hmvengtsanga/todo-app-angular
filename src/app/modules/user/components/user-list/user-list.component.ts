import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';

import { UserList } from 'src/app/modules/user/interfaces/user';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, TableModule, PaginatorModule, TagModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input({required: true}) users!: UserList[];
  @Input({required: true}) total!: number;
  @Input({required: true}) rows!: number;
  @Input() loading!: boolean;

  @Output() page:EventEmitter<any> = new EventEmitter<any>()

  paginateData(event:PaginatorState) {
     this.page.emit(event);
  }

}
