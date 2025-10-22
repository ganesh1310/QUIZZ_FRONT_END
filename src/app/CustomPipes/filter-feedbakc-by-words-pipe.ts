import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFeedbakcByWords',
  pure: false
})
export class FilterFeedbakcByWordsPipe implements PipeTransform {

   transform(users: any[], userName: string): any[] {
    return users.filter(user => user.userName === userName);
  }

}
