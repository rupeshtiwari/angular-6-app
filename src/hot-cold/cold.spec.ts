import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';

describe('COLD', () => {
  it('should create cold observable', () => {
    const provided = of('a');

    const expected = cold('(a|)');

    expect(provided).toBeObservable(expected);
  });

  it('should trim the spaces', () => {
    expect(cold('     ---a--b--c--| ')).toBeObservable(cold('---a--b--c--|'));
  });
});
