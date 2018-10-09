import { hot, getTestScheduler } from 'jasmine-marbles';
import { interval } from 'rxjs';
import { take, filter } from 'rxjs/operators';

describe('hot', () => {
  it('should work with asynchronous operators', () => {
    const scheduler = getTestScheduler();
    const received = interval(20, scheduler).pipe(take(4));

    /**
     * --0--1--2--3--4--5
     *   take(4), filter(evenOnly)
     * --0---2-
     */

    const expected = hot('140ms-a--c-|', { a: 0, b: 1, c: 2, d: 3, e: 4 });

    scheduler.flush();

    expect(received).toBeObservable(expected);
  });
});
