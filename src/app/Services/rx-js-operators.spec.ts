import { TestBed } from '@angular/core/testing';

import { RxJsOperators } from './rx-js-operators';

describe('RxJsOperators', () => {
  let service: RxJsOperators;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxJsOperators);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
