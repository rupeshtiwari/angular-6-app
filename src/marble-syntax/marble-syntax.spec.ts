import { cold } from 'jasmine-marbles';
import { NEVER, EMPTY } from 'rxjs';

describe('Marble Syntax', () => {
  describe('EMPTY', () => {
    it('emits no items but terminates normally', () => {
      const expected = cold('|');
      expect(EMPTY).toBeObservable(expected);
    });
  });

  describe('NEVER', () => {
    it('emits no items and does not terminate', () => {
      const expected = cold('-');
      expect(NEVER).toBeObservable(expected);

      const expected1  = cold('------');
      expect(NEVER).toBeObservable(expected1);
    });
  });
});
