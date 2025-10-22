import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchPipe',
  standalone: true
})
export class HighlightSearchPipePipe implements PipeTransform {

  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) return value;

    const escapedTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape regex
    const regex = new RegExp(escapedTerm, 'gi');

    return value.replace(regex, match => `<mark>${match}</mark>`);
  }

}
