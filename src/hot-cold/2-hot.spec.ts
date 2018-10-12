import { hot, cold } from 'jasmine-marbles';
import { from } from 'rxjs';
import { share } from 'rxjs/operators';

describe('hot', () => {
  it('should create hot observable', () => {
    const given = from([1, 2, 3]).pipe(share());
    const expected = hot('(abc|)', { a: 1, b: 2, c: 3 });

    expect(given).toBeObservable(expected);
  });

  it('should test subscription', () => {
    const source = hot('-a-^(bc)-|');
    const subscription = ' ^-----!';

    expect(source).toHaveSubscriptions(subscription);
  });

  it('should test subscription observable', () => {
    const source = hot('-a-^(bc)-|');
    const expected = cold('-(bc)-|');

    expect(source).toBeObservable(expected);
  });
});
