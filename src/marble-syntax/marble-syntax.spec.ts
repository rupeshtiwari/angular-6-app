import { cold } from 'jasmine-marbles';
import { NEVER, EMPTY } from 'rxjs';

describe('Marble Syntax', () => {
  describe('EMPTY', () => {
    it('emits no items but terminates normally', () => {
      expect(EMPTY).toBeObservable(cold('|'));
    });
  });

  describe('NEVER', () => {
    it('emits no items and does not terminate', () => {
      expect(NEVER).toBeObservable(cold('-'));
      expect(NEVER).toBeObservable(cold('-----'));
    });
  });
});
