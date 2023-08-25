import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { LoadingState } from 'src/app/core/states/loading.state';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  constructor () {} 

}
