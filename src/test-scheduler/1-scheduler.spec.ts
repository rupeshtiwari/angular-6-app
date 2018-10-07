import { hot, cold, getTestScheduler } from 'jasmine-marbles';
import { interval, Observable, from } from 'rxjs';
import { take, share, map, filter } from 'rxjs/operators';

describe('hot', () => {
  it('should create hot observable', () => {
    const provided1 = getHotObservable();
    getTestScheduler().flush();
    expect(provided1).toBeObservable(hot('(abc|)', { a: 1, b: 2, c: 3 }));
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
