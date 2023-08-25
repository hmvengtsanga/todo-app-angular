import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { tap, Subject, takeUntil} from 'rxjs';
import { Store, Actions, ofActionSuccessful} from '@ngxs/store';
import { Router } from '@angular/router';

import { LogoutUser } from 'src/app/core/actions/auth.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  private destroy:Subject<void> = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {
    this.initMenu();
  }

  ngOnInit(): void {
    this.initMenuTranslated();
    this.subscribeActionHandlers();
  }

  initMenuTranslated() {
    this.translateService.onLangChange
      .pipe(
        tap(() => this.initMenu()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  private initMenu() {
    this.items = [ 
      {
        label: this.translateService.instant('shared.menu.my_todos'),
        icon: 'pi pi-folder',
        routerLink: '/todos',
      },
      {
        label: this.translateService.instant('shared.menu.public_todos'),
        icon: 'pi pi-folder-open',
        routerLink: '/public-todos'
      },
      {
        label: this.translateService.instant('shared.menu.users'),
        icon: 'pi pi-users',
        routerLink: '/users',
        visible: true
      },
      {
        label: this.translateService.instant('shared.menu.logout'),
        icon: 'pi pi-power-off',
        command: () => {
            this.logout();
        }
      }
    ];
  }

  subscribeActionHandlers() {
    this.actions$.pipe(ofActionSuccessful(LogoutUser)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  logout() {
      this.store.dispatch(new LogoutUser());
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
  
}
