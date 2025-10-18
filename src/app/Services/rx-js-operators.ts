import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxJsOperators {
  constructor(){}

  public dummyJson = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'David', age: 28 },
    { id: 5, name: 'Eve', age: 22 }
  ];

  //map() : Transforms each item emitted by an Observable by applying a function to each item.
  mapExample(){
    const squaredNumbers = this.dummyJson.map(data => data.age + 5); //age of each added by 5
    console.log('Squared Numbers:', squaredNumbers);
  }

  //filter() : To control which values pass through a stream (ignore empty inputs, skip invalid data)
  filterExample(){
    const adults = this.dummyJson.filter(data => data.age >= 30);
    console.log('Adults:', adults);
  }

  //switchMap() : It is ideal for use when latest value matters like search options , route changes , etc.
  //            : It cancles the previous stream or call and switch to new one if any change happened
  switchMapExample(){
  //search question by category code
  }

  //mergeMap() : To handle multiple calls/observable at a time and not cancel any previous one
  //           : Ex. to submit multiple quiz answers at once
  mergeMapExample(){
    //we can send multiple categories at once and get all questions
  }

  //tap() : To perform side effects like logging, showing loader, etc without affecting the data stream
  tapExample(){
    // adding loader , consoling value , etc.
    tap(() =>{
      console.log('Side effect action performed');
    });
  }

  //debounceTime() : To limit the rate of emissions from an observable
  //                : Useful in search inputs to wait for user to stop typing
  debounceTimeExample(){
    //search question by category code with debounceTime
  }

  //disctinctUntilChanged() : To ignore consecutive duplicate values
  //                        : Useful in search inputs to avoid redundant calls
  distinctUntilChangedExample(){
    //search question by category code with distinctUntilChanged
  }

  //retry() : To retry a failed observable a specified number of times
  retryExample(){
    //API call with retry logic
  }
}
