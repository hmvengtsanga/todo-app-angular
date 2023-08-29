import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity',
  standalone: true
})
export class SeverityPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value) {
      case 'in_progress':
        return 'warning';
      case 'done':
        return 'success';
      default:
        return '';
    }
  }

}
