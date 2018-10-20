import { cold } from 'jasmine-marbles';
import { from } from 'rxjs';

describe('from operator', () => {
  it('should work with value', () => {
    const result = from(['orange']);
    const expected = cold('(x|)', { x: 'orange' });

    expect(result).toBeObservable(expected);
  });
});
