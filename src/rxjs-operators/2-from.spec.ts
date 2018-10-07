import { cold } from 'jasmine-marbles';
import { from } from 'rxjs';

describe('from operator', () => {
  it('should work with value and error', () => {
    const expected = cold('(x|)', { x: 'orange' });
    const result = from(['orange']);

    expect(result).toBeObservable(expected);
  });
});
