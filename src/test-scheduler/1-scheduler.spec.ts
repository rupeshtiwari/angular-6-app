import { hot, getTestScheduler, cold, initTestScheduler } from 'jasmine-marbles';
import { interval } from 'rxjs';
import { take, filter } from 'rxjs/operators';

describe('testscheduler', () => {
  it('should work with interval operators', () => {
    const scheduler = getTestScheduler();
    const source = interval(20, scheduler);
    const result = source.pipe(take(4));

    /**
     * --0-1-2-3-4-5
     *   take(4)
     * --0-1-2-(3|)
     */

    const expected = cold('--a-b-c-(d|)', { a: 0, b: 1, c: 2, d: 3, e: 4 });

    expect(result).toBeObservable(expected);
  });

  it('should work with interval operators with large time', () => {
    initTestScheduler();
    const scheduler = getTestScheduler();


    const source = interval(80, scheduler);
    const result = source.pipe(take(4));

    /**
     * 80ms 0 159ms 1 239ms 2 319ms 3 79ms 4 79ms 5
     *   take(4)
     * 80ms 0 159ms 1 239ms 2 319ms (3|)
     */

    const expected = cold('--------a 159ms b 239ms c 319ms (d|)', {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4
    });

    expect(result).toBeObservable(expected);
  });
});
