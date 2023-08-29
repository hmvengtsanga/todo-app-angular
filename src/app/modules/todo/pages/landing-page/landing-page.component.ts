import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

}
