import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'me',
        pathMatch: 'full',
      },
      {
        path: 'me',
        loadComponent: () => import('./pages/my-todo-page/my-todo-page.component').then((comp) => comp.MyTodoPageComponent),
      },
      {
        path: 'public',
        loadComponent: () => import('./pages/public-todo-page/public-todo-page.component').then((comp) => comp.PublicTodoPageComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
