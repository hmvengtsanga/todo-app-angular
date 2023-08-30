import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./modules/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'todos',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/todo/todo.module').then((mod) => mod.TodoModule),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./core/errors/pages/not-found/not-found.component').then((comp) => comp.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
