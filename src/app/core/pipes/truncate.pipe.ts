import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    const limit = args[0] ?? 0;

    if (limit === 0) {
      return value;
    }

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
