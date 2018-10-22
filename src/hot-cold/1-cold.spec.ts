import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';

describe('concat', () => {
  

  it('should create cold observable', () => {
    const provided = of(1);

    const expected = cold('(b|)', { b: 1 });

    expect(provided).toBeObservable(expected);
  });

  it('should create cold observable single', () => {
    const provided1 = of(1, 2, 3);
    const expected = cold('(bcd|)', { b: 1, c: 2, d: 3 });

    expect(provided1).toBeObservable(expected);
  });
});
