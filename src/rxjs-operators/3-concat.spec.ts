import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat', () => {
  it('should concat cold observables', () => {
    const obs1 = cold('---a---b|');
    const obs2 = cold('---c---d|');
    const result = concat(obs1, obs2);
    const expected = cold('---a---b---c---d|');
    expect(result).toBeObservable(expected);
  });

  it('should concat hot observables', () => {
    const obs1 = hot('---a--^--b--|');
    const obs2 = hot('------^----c--d|');
    const result = concat(obs1, obs2);
    const expected = cold('---b----d|');
    expect(result).toBeObservable(expected);
    expect(obs1).toHaveSubscriptions('^-----!');
    expect(obs2).toHaveSubscriptions('------^--!');
  });
});
