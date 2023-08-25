import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-todo-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './my-todo-page.component.html',
  styleUrls: ['./my-todo-page.component.scss']
})
export class MyTodoPageComponent {

}
