import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

describe('of', () => {
  it('should work with of operator with Array values', () => {
    const result = of(1, 2, 3);
    const expected = cold('(abc|)', { a: 1, b: 2, c: 3 });

    expect(result).toBeObservable(expected);
  });

  it('should work with of operator with scaler data', () => {
    const result = of({ name: 'john' });
    const expected = cold('(x|)', { x: { name: 'john' } });

    expect(result).toBeObservable(expected);
  });
});
