import { hot, getTestScheduler } from 'jasmine-marbles';
import { interval, from } from 'rxjs';
import { take, share, filter } from 'rxjs/operators';

describe('hot', () => {
  it('should create hot observable', () => {
    const given = from([1, 2, 3]).pipe(share());
    const expected = hot('(abc|)', { a: 1, b: 2, c: 3 });

    expect(given).toBeObservable(expected);
  });

  it('should work with asynchronous operators', () => {
    const obs1 = interval(10, getTestScheduler()).pipe(
      take(4),
      filter(v => v % 2 === 0)
    );

    const expected = hot('-a-c|', { a: 0, b: 1, c: 2, d: 3 });

    expect(obs1).toBeObservable(expected);
  });
});

function getHotObservable() {
  return from([1, 2, 3]).pipe(share());
}
